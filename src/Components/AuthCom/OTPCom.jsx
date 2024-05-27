
import React from 'react'

const OTPCom = () => {
  return (
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto lg:w-full w-11/12 max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p className='text-2xl'>Email Verification</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>
    
          <div>
            <form action="" method="post">
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                </div>
    
                <div class="flex flex-col space-y-5">
                  <div>
                    <button class="flex flex-row items-center justify-center text-center w-full border rounded-md outline-none py-4 bg-black border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
    
                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPCom

{/* <script>
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('otp-form')
        const inputs = [...form.querySelectorAll('input[type=text]')]
        const submit = form.querySelector('button[type=submit]')

        const handleKeyDown = (e) => {
            if (
                !/^[0-9]{1}$/.test(e.key)
                && e.key !== 'Backspace'
                && e.key !== 'Delete'
                && e.key !== 'Tab'
                && !e.metaKey
            ) {
                e.preventDefault()
            }

            if (e.key === 'Delete' || e.key === 'Backspace') {
                const index = inputs.indexOf(e.target);
                if (index > 0) {
                    inputs[index - 1].value = '';
                    inputs[index - 1].focus();
                }
            }
        }

        const handleInput = (e) => {
            const { target } = e
            const index = inputs.indexOf(target)
            if (target.value) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus()
                } else {
                    submit.focus()
                }
            }
        }

        const handleFocus = (e) => {
            e.target.select()
        }

        const handlePaste = (e) => {
            e.preventDefault()
            const text = e.clipboardData.getData('text')
            if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
                return
            }
            const digits = text.split('')
            inputs.forEach((input, index) => input.value = digits[index])
            submit.focus()
        }

        inputs.forEach((input) => {
            input.addEventListener('input', handleInput)
            input.addEventListener('keydown', handleKeyDown)
            input.addEventListener('focus', handleFocus)
            input.addEventListener('paste', handlePaste)
        })
    })                        
</script> */}