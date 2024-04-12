import type { Block, TypingResult } from "@/types"
import { ref, type Ref } from "vue"
import { useTypingStore } from '@/stores/useTypingStore'
import { storeToRefs } from "pinia"
import { nextTick } from "vue"

export default function (
    typingResult: Ref<TypingResult>,
    curIndex: Ref<[number, number]>,
    showResult: Ref<boolean>
) {

    // 获取store中的数据
    const { generateWords, updateRefs } = useTypingStore()
    const { words, startTime, blocksContainer, blockRefs } = storeToRefs(useTypingStore())

    // 输入完成后的操作
    function handleEnd(enWords: Block[]) {
        // 计时：结束时间
        const endTime = Date.now()
        if (!startTime.value) {
            console.error('计时未开始')
            return
        }
        // 计算总用时，单位秒
        const duringNumber = (endTime - startTime.value) / 1000
        const during = Math.round(duringNumber) + 's'
        // 计算WPM，四舍五入保留两位小数
        const correctWord = enWords.filter((block) => block.isCorrect).length
        let wpmNumber = (correctWord / duringNumber * 60)
        wpmNumber = Math.round(wpmNumber * 100) / 100.
        const wpm = wpmNumber.toFixed(2)

        // 计算正确率，四舍五入保留两位小数
        let correctnessNumber = correctWord / words.value.length
        correctnessNumber = Math.round(correctnessNumber * 100)
        const correctness = correctnessNumber + '%'

        // 保存结果数据
        typingResult.value.wpm = wpm
        typingResult.value.correctness = correctness
        typingResult.value.during = during

        // 显示结果
        showResult.value = true
    }

    // 重新开始
    function restart() {
        // 去除所有样式
        blockRefs.value.forEach((r) => {
            // 去除汉字样式
            r.children[0].classList.remove('wrong', 'correct', 'skip')
            // 去除拼音样式
            const codes = [...r.children[1].children]
            codes.forEach((code) => {
                code.classList.remove('wrong', 'correct', 'skip')
            })
        })
        // 开始时间设为初始状态
        startTime.value = null
        // 生成新的词块
        generateBlocks()
        // 隐藏结果界面
        showResult.value = false
        // 需要渲染后进行的操作
        nextTick(() => {
            // 聚焦
            if (blocksContainer.value) {
                blocksContainer.value.focus()
            } else {
                alert("谔谔")
            }
            // 复位索引（定位浮标）
            curIndex.value = [0, 0]
        })
    }

    // 生成词块
    function generateBlocks() {
        // 更新动态节点
        updateRefs()
        // 获取随机词块
        generateWords(5)
    }

    return { handleEnd, restart }
}