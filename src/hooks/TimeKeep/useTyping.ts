import { nextTick, type Ref } from 'vue'
import { useTypingStore } from '@/stores/useTypingStore'
import { storeToRefs } from 'pinia'

export default function (curIndex: Ref<[number, number]>, handleEnd: Function) {
  // 获取store中的数据
  const { words, blockRefs, caret, enWords, startTime } = storeToRefs(useTypingStore())

  // 开始输入
  function startTyping() {
    caret.value?.classList.remove('hide') // 移除隐藏样式
    caret.value?.classList.add('waiting') // 添加等待样式
  }

  // 结束输入
  function endTyping() {
    caret.value?.classList.add('hide') // 添加隐藏样式
  }

  // 输入
  function typing(e: KeyboardEvent) {
    const { codeElements, cn: cnElement } = getTargetElement(curIndex.value[0]) as {
      codeElements: HTMLCollection
      cn: HTMLElement
    }

    if (caret.value) {
      caret.value.classList.remove('waiting') // 移除等待样式
    }

    if (e.code.startsWith('Key')) {
      // 第一次输入时开始计时
      if (!startTime.value) {
        startTime.value = Date.now()
      }

      // 处理字母按键输入
      if (enWords.value[curIndex.value[0]].typing) {
        enWords.value[curIndex.value[0]].typing += e.key
      } else {
        enWords.value[curIndex.value[0]].typing = e.key
      }

      // 判断输入是否正确
      if (curIndex.value[1] != codeElements.length) {
        const target = codeElements[curIndex.value[1]] as HTMLElement
        target.classList.add(e.key == enWords.value[curIndex.value[0]].en[curIndex.value[1]] ? 'correct' : 'wrong') // 根据输入是否正确添加样式
        target.classList.remove('skip')
      }

      // 更新索引和输入内容

      if (words.value.length <= curIndex.value[0]) {
        console.error('block索引越界')
      }

      // 判断code部分是否有多余输入
      if (curIndex.value[1] < words.value[curIndex.value[0]].en.length) {
        // 判断，如果输入为最后一个block中最后一个索引，直接结束
        if (
          curIndex.value[0] == words.value.length - 1 &&
          curIndex.value[1] == enWords.value[curIndex.value[0]].en.length - 1
        ) {
          handleEnd(enWords.value)
        } else {
          curIndex.value[1]++
        }
      } else {
        // 判断是否是最后一个block
        if (words.value.length > curIndex.value[0] + 1) {
          // 如果不是，多余输入会添加到原code后
          words.value[curIndex.value[0]].en += e.key
          nextTick(() => {
            const target = codeElements[curIndex.value[1]] as HTMLElement
            target.classList.add('wrong')
            curIndex.value[1]++
          })
        } else {
          // 如果是，多余输出会直接结束
          handleEnd(enWords.value)
        }
      }
    } else if (e.code === 'Space') {
      // 处理空格键
      if (curIndex.value[1] != 0) {
        // code索引至少为1时按下空格进行跳转

        if (curIndex.value[0] < words.value.length - 1) {
          // 给未输入元素添加样式
          const targets = [...codeElements].slice(curIndex.value[1], codeElements.length)
          targets.forEach((code) => code.classList.add('skip')) // 跳过未输入的字符
          // 记录输入是否正确
          enWords.value[curIndex.value[0]].isCorrect =
            enWords.value[curIndex.value[0]].typing == enWords.value[curIndex.value[0]].en
          // 根据输入正确性添加样式
          cnElement.classList.toggle('wrong', !enWords.value[curIndex.value[0]].isCorrect)
          cnElement.classList.toggle('correct', enWords.value[curIndex.value[0]].isCorrect)

          curIndex.value = [curIndex.value[0] + 1, 0] // 更新索引
        } else {
          // 在最后一个block中按下空格后结束
          handleEnd(enWords.value)
        }
      }
    } else if (e.code === 'Backspace') {
      // 处理退格键
      if (curIndex.value[0] == 0 && curIndex.value[1] == 0) {
        // 初始位置退格不处理
        return
      }

      // code索引为0，返回上一个block
      if (curIndex.value[1] <= 0) {
        // 获取上一个block的元素
        const { codeElements: lastBlockCodes, cn: lastBlockCn } = getTargetElement(curIndex.value[0] - 1) as {
          codeElements: HTMLCollection
          cn: HTMLElement
        }
        const lastBlockArr = [...lastBlockCodes]

        // 移除上一个block中汉字的样式和正误判断
        lastBlockCn.classList.remove('wrong', 'correct')
        enWords.value[curIndex.value[0] - 1].isCorrect = undefined

        // 检查是否有跳过，如有，退至跳转前的位置
        const haveSkip = lastBlockArr.filter((code) => code.classList.contains('skip')).length > 0

        if (haveSkip) {
          // 获取未输入字符起始索引
          let startIndex
          for (let i = 0; i < lastBlockArr.length; i++) {
            if (lastBlockArr[i].classList.contains('skip')) {
              startIndex = i
              break
            }
          }
          // 获取所有未输入字符
          const targets = lastBlockArr.slice(startIndex, lastBlockArr.length)
          // 移除未输入字符的样式
          targets.forEach((code) => code.classList.remove('skip'))
          // 修改索引至跳转前位置
          if (startIndex) {
            curIndex.value = [curIndex.value[0] - 1, startIndex]
          } else {
            console.error('索引元素不存在')
          }
        } else {
          // 无跳过则返回上一个block的末尾
          curIndex.value = [curIndex.value[0] - 1, words.value[curIndex.value[0] - 1].en.length]
        }
      } else {
        // code索引不为0

        // 更新输入，删除输入字符串的最后一位
        const currentTyping = enWords.value[curIndex.value[0]].typing
        if (currentTyping) {
          enWords.value[curIndex.value[0]].typing = currentTyping.slice(0, -1)
        }
        // 如果存在多余输入，删除页面中对应block的一个字符
        if (curIndex.value[1] > enWords.value[curIndex.value[0]].en.length) {
          words.value[curIndex.value[0]].en = words.value[curIndex.value[0]].en.slice(0, -1)
          nextTick(() => curIndex.value[1]--)
        } else {
          // 无多余输入则直接让code索引减一
          curIndex.value[1]--
          const target = codeElements[curIndex.value[1]] as HTMLElement
          // 移除该字符的正误样式
          target.classList.remove('correct', 'wrong')
        }
      }
    }
  }

  // 获取指定索引的block元素对象
  function getTargetElement(index: number) {
    const blockRef = blockRefs.value[index]
    if (!blockRef) {
      console.error('Block元素不存在')
      return
    }

    const cn = blockRef.children[0] as HTMLElement
    const en = blockRef.children[1] as HTMLElement
    const codeElements = en.children
    return { cn, codeElements }
  }

  return { startTyping, endTyping, typing, startTime }
}
