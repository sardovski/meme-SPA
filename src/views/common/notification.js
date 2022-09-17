const notifyContainer = document.querySelector('#notifications>div');

export async function notify(msg) {
    notifyContainer.style.display = 'block';
    notifyContainer.querySelector('span').textContent = msg;
    const timeOut = new Promise(()=>{
        
        setTimeout(() => {
         clearNotify();
    }, 3000);});

    await timeOut;

}

notifyContainer.addEventListener('click', clearNotify);

async function clearNotify() {
    notifyContainer.style.display = 'none';
    notifyContainer.querySelector('div>span').textContent = '';
}