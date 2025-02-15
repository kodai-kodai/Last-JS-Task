'use strict';
const selectlevel = document.getElementById("SelectButton");
document.getElementById('SelectButton').addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="level"]:checked');
    console.log(selectedOption)
    switch (selectedOption.value) {
        case '1':
            window.location.href = './connection_easy.html';
            break;
        case '2':
            window.location.href = './connection_nmal.html';
            break;
        case '3':
            window.location.href = './connection_hard.html';
            break;
        default:
            alert('何も選択されていません');
            break;
    }
});

