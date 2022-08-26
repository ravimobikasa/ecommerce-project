document.addEventListener('DOMContentLoaded', async () => {
  const stripe = Stripe(
    'pk_test_51LUnlrSApwaIyK3wOJUY3VDQ90CNaLKyORgAsvbXyVsf4pXoPg18w5EK7FiwCeG4Yl9mNOvnEJlrlPyD7SEbejE200TOU5nE4y'
  )

  var elements = stripe.elements()
  var cardElement = elements.create('card')
  cardElement.mount('#card-element')

  const form = document.querySelector('#payment-form')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // { clientSecret }
    const { client_secret } = await fetch('http://localhost:6060/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((r) => r.json())
    console.log(client_secret)
    const nameInput = document.querySelector('#name')
    const emailInput = document.querySelector('#email')
    const result = await stripe.confirmCardPayment(client_secret, {
      //pass the payment method id you already have , or
      payment_method: {
        card: cardElement,
        billing_details: {
          name: nameInput.value,
          email: emailInput.value,
        },
      },
      // payment_method: 'pm_1Lafk4SApwaIyK3wmOw9lGS4',
    })

    const paymentIntent = result.paymentIntent
    console.log(paymentIntent)
    addMessage(`PaymentIntent (${paymentIntent.id}:${paymentIntent.status})`)
  })
})

const addMessage = (message) => {
  const messagesDiv = document.querySelector('#messages')
  messagesDiv.style.display = 'block'
  messagesDiv.innerHTML += '>' + message + '<br>'
  console.log(message)
}
