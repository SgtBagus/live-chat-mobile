 const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

 const alert = (message, type) => {
     const wrapper = document.createElement('div')
     wrapper.innerHTML = [
         `<div class="alert alert-${type} alert-dismissible" role="alert">`,
         ` <div class="error-text"> <i class="ri-check-line"></i> ${message}</div>`,
         '</div>'
     ].join('')

     alertPlaceholder.append(wrapper)
 }

 const alertTrigger = document.getElementById('liveAlertBtn-success')
 if (alertTrigger) {
     alertTrigger.addEventListener('click', () => {
         alert('Item Successfully Added', 'success')
     })
 }