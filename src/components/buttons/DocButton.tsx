'use client'

const DocButton = () => {
  document.getElementById('myButton')?.addEventListener('click', function () {
    console.log('document')
    alert('Button clicked')
  })
  return (
    <div>
      <button id="myButton">жми товарищ</button>
    </div>
  )
}
export default DocButton
