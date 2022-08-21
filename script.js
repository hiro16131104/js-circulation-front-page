/*** 初期設定 ここから↓↓ ***/
const allGroup = {
    name: "グループ全体"
}
const group1 = {
    name: "グループ1",
    members: ["Aさん", "Bさん", "Cさん", "Dさん", "Eさん", "Fさん", "Gさん"]
}
const group2 = {
    name: "グループ2",
    members: ["Hさん", "Iさん", "Jさん", "Kさん", "Lさん", "Mさん", "Nさん"]
}
const group3 = {
    name: "グループ3",
    members: ["Oさん", "Pさん", "Qさん", "Rさん", "Sさん", "Tさん", "Uさん"]
}
/*** 初期設定 ここまで↑↑ ***/

const listGroup = [allGroup, group1, group2, group3]

// 初めに、各DOM要素に値を埋め込む
const initSetElement = () => {
    const elemsTab = document.querySelector("#tabArea").querySelectorAll("span")
    const elemTitle = document.querySelector("#title")
    const elemTable = document.querySelector("#tableGroup")
    const elemsTh = [elemTable.rows[0].cells, elemTable.rows[2].cells, elemTable.rows[4].cells]
    const elemsTd = [elemTable.rows[1].cells, elemTable.rows[3].cells, elemTable.rows[5].cells]
    const elemTBody = elemTable.querySelector("tbody")
    let divWidth = 0

    // タブの設定
    for (let i = 0; i < listGroup.length; i++) {
        elemsTab[i].innerText = listGroup[i].name
    }
    // タイトルの設定
    elemTitle.innerText = `${listGroup[0].name}\u3000回覧`

    // Tableの設定
    for (let i = 0; i < elemsTh.length; i++) {
        const elemTh = elemsTh[i]
        const elemTd = elemsTd[i]
        const members = listGroup[i + 1].members

        for (let ii = 0; ii < elemTh.length; ii++) {
            if (members[ii]) {
                // 列名に職員の名前を表示
                elemTh[ii].innerText = members[ii]
            } else {
                // 職員名がない列は非表示
                elemTh[ii].classList.toggle("cell-is-invisible")
                elemTd[ii].classList.toggle("cell-is-invisible")
            }
        }
    }

    // divの横幅をtableに揃える
    divWidth = elemTBody.getBoundingClientRect().width
    document.querySelector("#titleArea").style.width = `${divWidth}px`
    document.querySelector("#contentsArea").style.width = `${divWidth}px`
}

// タブの切替え
const changeTab = event => {
    const elemsTab = document.querySelector("#tabArea").querySelectorAll("span")
    const elemTarget = event.target
    const elemTitle = document.querySelector("#title")
    const elemsTr = document.querySelector("#tableGroup").rows
    let listIdx = []

    // 全てのタブの選択状態を解除した後、クリックしたタブを選択状態に
    for (let i = 0; i < elemsTab.length; i++) {
        elemsTab[i].classList.remove("tab-is-active")
    }
    elemTarget.classList.toggle("tab-is-active")
    // タイトルを変更
    elemTitle.innerText = `${elemTarget.innerText}\u3000回覧`

    // Tableの設定
    // すべての行を非表示に
    for (let i = 0; i < elemsTr.length; i++) {
        elemsTr[i].classList.remove("row-is-invisible")
        elemsTr[i].classList.toggle("row-is-invisible")
    }

    // 選択したタブに応じて、表示する行を決定
    if (elemsTab[0].classList.contains("tab-is-active")) {
        listIdx = [0, 1, 2, 3, 4, 5]
    } else if (elemsTab[1].classList.contains("tab-is-active")) {
        listIdx = [0, 1]
    } else if (elemsTab[2].classList.contains("tab-is-active")) {
        listIdx = [2, 3]
    } else if (elemsTab[3].classList.contains("tab-is-active")) {
        listIdx = [4, 5]
    }

    for (let i = 0; i < listIdx.length; i++) {
        const idx = listIdx[i]
        elemsTr[idx].classList.remove("row-is-invisible")
    }
}

// 印刷する際は、tableの複製を作り、タブ等は非表示にする
const changePrintMode = () => {
    const elemDivNotPrintArea = document.querySelector("#notPrintArea")
    const elemDivPrintArea = document.querySelector("#printArea")
    const elemDivPrintAreaClone = document.querySelector("#printAreaClone")
    const elemsTab = document.querySelector("#tabArea").querySelectorAll("span")
    let elemsDivClone = []
    let printCount = 0

    // 選択したタブに応じて、tableを複製する個数を決定
    if (elemsTab[0].classList.contains("tab-is-active")) {
        printCount = 3
    } else {
        printCount = 7
    }

    // tableを複製し、borderを消す
    for (let i = 0; i < printCount; i++) {
        elemDivPrintAreaClone.innerHTML += elemDivPrintArea.innerHTML
    }
    elemDivPrintAreaClone.classList.toggle("layout-print-area-clone")
    elemsDivClone = elemDivPrintAreaClone.querySelectorAll("div")

    // 印刷した後の切り取り線を表示
    for (let i = 0; i < elemsDivClone.length; i++) {
        if (i != 0 && i % 2 == 0) {
            elemsDivClone[i].style.borderTop = "1px dashed #000"
        }
    }
    // 印刷しない情報を非表示
    elemDivNotPrintArea.classList.toggle("area-is-invisible")
    elemDivPrintArea.classList.toggle("area-is-invisible")
    // 印刷ダイアログ表示
    window.print()
    // 変更した箇所を元に戻す
    elemDivPrintAreaClone.innerHTML = ""
    elemDivPrintAreaClone.classList.remove("layout-print-area-clone")
    elemDivNotPrintArea.classList.remove("area-is-invisible")
    elemDivPrintArea.classList.remove("area-is-invisible")
}

// 各DOM要素に関数を貼り付け
window.addEventListener("load", () => initSetElement())
document.querySelector("#tabAllGroup").addEventListener("click", e => changeTab(e))
document.querySelector("#tabGroup1").addEventListener("click", e => changeTab(e))
document.querySelector("#tabGroup2").addEventListener("click", e => changeTab(e))
document.querySelector("#tabGroup3").addEventListener("click", e => changeTab(e))
document.querySelector("#btnPrint").addEventListener("click", () => changePrintMode())