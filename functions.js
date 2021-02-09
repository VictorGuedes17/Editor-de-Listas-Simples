function addText() {
    cleanTextArea();

    const { secondTextArea, validChecboxAspas, validChecboxVirgula, allLines } = findByElementsId();

    if (validChecboxAspas === false && validChecboxVirgula === false) {
        alert("Você deve marcar uma opção");
        return false;
    }

    let newValue = "";

    allLines.map((line, index) => {
        let newText = "";
        let newTextValue = "";
        if (validChecboxAspas && validChecboxVirgula) {
            newText = createAspasAndVirgula(line, newTextValue, newText);
        } else if (validChecboxAspas) {
            newText = createOnlyAspas(line, newTextValue, newText);
        } else if (validChecboxVirgula) {
            newText = createOnlyVirgula(line, newTextValue, newText);
        }

        if (line.length > 0) {
            newValue = newValue.concat(newText);
        }

    })

    secondTextArea.value = String(newValue);

}

function createOnlyAspas(line, newTextValue, newText) {
    const hasVirgulaLastPosition = line.substring(line.length - 1).trim() === ",";

    if (hasVirgulaLastPosition) {
        newTextValue = line.substring(0, line.length - 1);
        newText = `"${newTextValue}",\n`;
    } else {
        newText = `"${line}"\n`;
    }
    return newText;
}



function createOnlyVirgula(line, newTextValue, newText) {
    const hasVirgulaLastPosition = line.substring(line.length - 1).trim() === ",";

    if (hasVirgulaLastPosition) {
        newText = `${line} \n`
    } else {
        newText = `${line}, \n`
    }
    return newText;

}

function createAspasAndVirgula(line, newTextValue, newText) {
    const hasVirgulaLastPosition = line.substring(line.length - 1).trim() === ",";
    const hasAspasLastPosition = line.substring(line.length - 1).trim() === '"' || line.substring(line.length - 1).trim() === "'" || line.substring((line.length - 2) - 1).trim() === '"' || line.substring((line.length - 2) - 1).trim() === "'";
    const hasAspasfirstPosition = line.substring(0, 1).trim() === "'" || line.substring(0, 1).trim() === '"';

    if (!hasVirgulaLastPosition && !hasAspasLastPosition && !hasAspasfirstPosition) {
        newText = `"${line}",\n`;
    } else {
        if (hasVirgulaLastPosition && hasAspasLastPosition && hasAspasfirstPosition) {
            return
        } else if (hasAspasLastPosition && hasAspasfirstPosition) {
            newText = `${line},\n`;
        } else if (hasAspasfirstPosition && hasVirgulaLastPosition) {
            newTextValue = line.substring(0, line.length - 1);
            newText = `${newTextValue}",\n`;
        } else if (hasAspasLastPosition && hasVirgulaLastPosition) {
            newText = `"${line}\n`;
        } else if (hasAspasfirstPosition) {
            newText = `${line}",\n`;
        } else if (hasAspasLastPosition) {
            newText = `"${line},\n`;
        } else if (hasVirgulaLastPosition) {
            newTextValue = line.substring(0, line.length - 1);
            newText = `"${newTextValue}",\n`;
        }
    }
    return newText;
}

function cleanTextArea() {
    const secondTextArea = document.getElementById("secondTextArea");
    secondTextArea.value = "";
}

function copyText() {
    document.getElementById("secondTextArea").select();
    document.execCommand('copy');
}

function findByElementsId() {
    const firstTextArea = document.getElementById("firstTextArea");
    const secondTextArea = document.getElementById("secondTextArea");
    const checboxAspas = document.getElementById("checboxAspas");
    const checboxVirgula = document.getElementById("checboxVirgula");
    const firstTextAreaValue = firstTextArea.value;
    const allLines = firstTextAreaValue.substring(0, firstTextArea.selectionStart).split("\n");
    const validChecboxAspas = checboxAspas.checked;
    const validChecboxVirgula = checboxVirgula.checked;

    return { secondTextArea, validChecboxAspas, validChecboxVirgula, allLines }
}



// function removeText() {
//     cleanTextArea();
//     const { firstTextArea, secondTextArea, checboxAspas, checboxVirgula } = findByElementsId();
//     const removeAspas = checboxAspas.checked;
//     const validChecboxVirgula = checboxVirgula.checked;

//     if(removeAspas === false && validChecboxVirgula === false){
//         alert("Você deve marcar uma opção");
//         return;
//     }

//     const firstTextAreaValue = firstTextArea.value;
//     const allLines = firstTextAreaValue.substring(0, firstTextArea.selectionStart).split("\n")


//     let newValue = "";


//     allLines.map((line, index) => {
//         let newTextValue = "";
//         if (removeAspas && validChecboxVirgula) {
//             newTextValue = `${line.substring(1, (line.length - 2))}\n`;
//         } else if (removeAspas === true) {
//             newTextValue = `${line.substring(1, (line.length - 2))},\n`;
//         } else if (validChecboxVirgula === true) {
//             newTextValue = `${line.substring(0, (line.length - 1))}\n`;
//         }

//         if (line.length > 0) {
//             newValue = newValue.concat(newTextValue);
//         }
//     })

//     secondTextArea.value = String(newValue);
// }
