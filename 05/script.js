const previousOperationText = document.querySelector("#last-calc")
const currentOperationText = document.querySelector("#result")
const buttons = document.querySelectorAll("#keyboard button") // ----> queriSelectorAll é necessario para pegar todos os buttons******

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    // add digit to calculator screen
    addDigit(digit) {

        // check if current operation already has a dot
        if (digit === "," && this.currentOperationText.innerText.includes(",")) { // logica feita para verificar se ja tem uma virgula
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Process all calculator operations
    processOperation(operation) {
        // check is current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") { // ----> se dentro da caixa de texto current nao tiver nada "", vai haver a troca de operações
            //change operation                                                          
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }
        // get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0] // ----> nao entendi 
        const current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "–":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "x":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "÷":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "+/–":
                
            if (current > 0){
                operationValue = current * (-1)
                this.updateScreen(operationValue, operation)
            } else {
                operationValue = SetNum(Math.abs(current))
                this.updateScreen(operationValue, operation)
            }
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClearCurrentOperation()
                break
            case "C":
                this.processClearAllOperation()
                break
            case "=":
                this.processEqualsOperator()
                break
            default:
                return "404 ERROR Not Found MotherFucker"
        }
    }
    // chance values of the calculator screen
    updateScreen(                                                     // nesta função os valores inicialmente começam com null, pois toda função inicia vazia
        operationValue = null, // ----> OperationValue é o resultado 
        operation = null,      // ----> operation operação em si 
        current = null,        // ----> current valor atual
        previous = null)      // ----> prevoius valor futuro/proximo
    {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            // check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current
            }
            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    //change math operation
    changeOperation(operation) {
        const mathOperations = ["x", "÷", "+", "–"] // ----> é listado todas as operações e se no meio do calculo, for trocada o calculo, ele troca a operação

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation
    }
    // Delete the last digite
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1)
    }
    // Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ""
    }
    // Clear all operations
    processClearAllOperation() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }
    // Process an Operation
    processEqualsOperator() {
        const operation = previousOperationText.innerText.split(" ")[1] // split é uma forma de tratar uma strig, e todos os valores de innertext são string

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText

        if (+value >= 0 || value === ",") { // ----> este + na frente do value converte para numero****** 
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})