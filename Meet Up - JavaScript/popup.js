const newmeets = document.querySelector('.add');
const list = document.querySelector('.meets');
const rename = document.querySelector('.rename');
const search = document.querySelector('.search input');
const renamed = document.querySelector('.rename');
const popUp = document.querySelector('.popup-wrapper');
const close = document.querySelector('.close');
var meetlist = []

const generatemeetsTemplate = (data)=>{
    const liTemplate = `<li class="list-group-item text-light py-1 pr-3 justify-content-between d-flex align-items-center"><a class="linki p-2" href="${data}">
                            ${data}
                          </a>
                            <span>
                              <i class="fas fa-pen-square rename"></i>
                              <i class="fas fa-minus-circle delete"></i>
                            </span>
                        </li>`;
    list.innerHTML += liTemplate;
}



newmeets.addEventListener('submit', (e)=>{
    e.preventDefault()
    const meets = newmeets.add.value.trim();
    meetlist.push(meets);
    localStorage.setItem('prevTodos',JSON.stringify(meetlist))
    // if(meets.length){
    //     list.innerHTML += generatemeetsTemplate(meets);
    // }
    if(meets !== ""){
        generatemeetsTemplate(meets);
    }
    newmeets.reset();
})

list.addEventListener('click', (e)=>{
    if(e.target.classList.contains('rename')){
      e.stopPropagation();
      const toR=e.path[2].textContent.trim()
      renamer1(e,toR);
      // console.log(e.path[2].children[1]);
      
    }

    if(e.target.classList.contains('delete')){
        e.stopPropagation();
        const toDelete=e.path[2].textContent.trim()
        e.path[2].remove();
        meetlist = meetlist.filter(item =>{
          return item !== toDelete
        })
        localStorage.clear()
        localStorage.setItem('prevTodos',JSON.stringify(meetlist))
    }
    
})

const renamer1 = (e, toR)=>{
    popUp.style.display = "block";
    renamed.addEventListener('submit', (f)=>{
      f.preventDefault();
      const l = renamed.rename.value.trim();
      renamed.reset();
      e.path[2].children[0].innerHTML = `${l} </a>`;
      e.path[2].remove();
      var index = meetlist.indexOf(toR)
      if (~index) {
          meetlist[index] = l;
      }
      localStorage.clear()
      localStorage.setItem('prevTodos',JSON.stringify(meetlist))
      generatemeetsTemplate(l);
      self.location.reload()
      popUp.style.display= "none";
    });
    
}

const filtermeets = (term)=>{
    Array.from(list.children)
    .filter((meets)=>{
        return !meets.textContent.toLowerCase().includes(term)
    }).forEach((meets)=>{
        meets.classList.add('d-none')
    })

    Array.from(list.children)
    .filter((meets)=>{
        return meets.textContent.toLowerCase().includes(term)
    }).forEach((meets)=>{
        meets.classList.remove('d-none')
    })
}

search.addEventListener('keyup',()=>{
    const term = search.value.trim();
    filtermeets(term.toLowerCase());
})

const render = ()=>{
  JSON.parse(localStorage.getItem('prevTodos')).forEach((Element)=>{
      meetlist.push(Element)
      generatemeetsTemplate(Element)
  })
}

if(localStorage.getItem('prevTodos'))
{
    render();
}

const closer = ()=>{
  popUp.style.display = "none";
}

close.addEventListener("click", closer);



