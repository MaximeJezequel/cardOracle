export const oracle = (inputList: string[]) => {
  const colors = ["s", "h", "c", "d"]
  const courtCards = ["j", "q", "k"]

  //Function to convert card to index
  const getIndexFromCard = (input: any) => {
    const inputArray = input.split(",")
    let outputArray: any = []

    inputArray.forEach((input: any) => {
      const inputValue = input
        .substring(0, input.length - 1)
        .trim()
        .toLowerCase()
      const inputColor = input
        .substring(input.length - 1, input.length)
        .toLowerCase()
      const isNotAce = inputValue != "a" && inputColor != "a" ? 1 : 0

      let isValueSecond = colors.includes(inputValue)

      let pivotValue = isValueSecond ? inputColor : inputValue
      let pivotColor = !isValueSecond ? inputColor : inputValue

      const value = isNaN(pivotValue)
        ? 1 + isNotAce * (10 + courtCards.indexOf(pivotValue))
        : parseInt(pivotValue)
      const color = colors.includes(pivotColor) ? pivotColor : ""

      const output = (value - 1) * 4 + colors.indexOf(color)

      outputArray.push(output)
    })
    return outputArray
  }

  // Launch
  const showPrompt = (cards: string[]) => {
    if (!cards) return

    // Determine if secret card is high or low
    let firstTouch = cards[0].split("").slice(-1)
    let isHigh = !colors.includes(firstTouch[0].toLowerCase())

    // Display inputCards array
    let inputCards = []
    inputCards = getIndexFromCard(cards.join().toLowerCase())

    // Sort inputCards array
    const sortedCards = [...inputCards].sort((a, b) => a - b)

    // Determine the suit of secret card
    const secretCardSuitIndex = sortedCards.indexOf(inputCards[0])
    let secretCardSuit = [...colors].reverse()[secretCardSuitIndex]

    // Determine if secret card id even
    const cardIsEven = inputCards[3] > inputCards[2]

    // Determine the multiplicity of the secret card
    let multipleOfThree: any = null
    if (inputCards[1] < inputCards[2] && inputCards[1] < inputCards[3]) {
      multipleOfThree = 0
    } else if (inputCards[1] > inputCards[2] && inputCards[1] > inputCards[3]) {
      multipleOfThree = 1
    } else {
      multipleOfThree = 2
    }

    // Initialization of potential secretCard values
    let secretCardValue: any = Array.from(Array(13).keys()).splice(1, 13)
    // Filter high/low
    secretCardValue = isHigh
      ? secretCardValue.filter((t: any) => t >= 7)
      : secretCardValue.filter((t: any) => t < 7)
    // Filter even/odd
    secretCardValue = cardIsEven
      ? secretCardValue.filter((t: any) => t % 2 == 0)
      : secretCardValue.filter((t: any) => t % 2 != 0)
    // Filter multiplicity
    secretCardValue = secretCardValue.filter(
      (t: any) => t % 3 == multipleOfThree
    )
    secretCardValue = secretCardValue.join()

    // Special cases for Aces and court cards
    if (secretCardValue == 1) {
      secretCardValue = "a"
    }
    if (secretCardValue > 10) {
      secretCardValue = courtCards[secretCardValue - 11]
    }

    const codedCard = secretCardValue + secretCardSuit

    // Check if the secret card is a king
    const reverseSecretCardValue = getIndexFromCard(codedCard).join()
    const isKing = sortedCards.includes(parseInt(reverseSecretCardValue))

    if (isKing) {
      secretCardValue = "k"
      let kingIndex = sortedCards.indexOf(parseInt(reverseSecretCardValue))
      secretCardSuit = colors[kingIndex]
    }

    // Check if coded card is also a king
    const reverseSecretCardValue2 = getIndexFromCard(
      secretCardValue + secretCardSuit
    ).join()
    const isKing2 = sortedCards.includes(parseInt(reverseSecretCardValue2))

    if (isKing2) {
      let kingIndex2 = sortedCards.indexOf(parseInt(reverseSecretCardValue2))
      secretCardSuit = colors[kingIndex2]
    }

    // console.log("card is high ? :", isHigh)
    // console.log("Coded card is even ? : ", cardIsEven)
    // console.log("Coded card : ", codedCard)
    // console.log("Card revealed : ", secretCardValue + secretCardSuit)

    return (secretCardValue + secretCardSuit).toUpperCase()
  }
  return showPrompt(inputList)
}
