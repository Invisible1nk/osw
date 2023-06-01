
// function showGif(event){
//     if(event.target.dataset.title){
//         const gif = event.target.dataset.title
//         const img = document.createElement('img');
//         img.setAttribute("class","tistory");
//         img.setAttribute("src",gif);
//         img.setAttribute("style","height:50%")
//         console.log(img)
//         document.getElementById('showGif').append(img)
//     }
// }
// function removeGif(event){
//     if(event.target.dataset.title){
//         console.log(document.getElementById('showGif').lastChild)
//         document.getElementById('showGif').lastChild.remove()
//     }
// }

// const map = document.querySelector('#banner .ch');

// map.addEventListener('mouseover',showGif);
// map.addEventListener('mouseout',removeGif);


function showGif(event) {
    console.log(1234)
    if ($(event.target).data('title')) {
        const gif = $(event.target).data('title');
        
        const img = $('<img>');
        img.addClass('tistory');
        img.attr('src', gif);
        console.log(img);
        $('#showGif').append(img);
    }
}

function removeGif(event) {
    if ($(event.target).data('title')) {
        console.log($('#showGif').children().last());
        $('#showGif').children().last().remove();
    }
}

const check = $('#banner .ch');

check.on('mouseover', showGif);
check.on('mouseout', removeGif);