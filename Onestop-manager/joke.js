
    document.getElementById("jokes").addEventListener('click',async()=>{
   
    const url = 'https://api.chucknorris.io/jokes/random'
    try{
    const res = await fetch(url);
    const jokecontent = await res.json();
    const jokevalue = jokecontent.value
    console.log(jokecontent)
    document.getElementById('display').innerHTML = jokevalue;
    document.getElementById("image").style.display = "none";
    document.getElementById("display").style.display = "block";
    }

    catch(err)
    {
    console.error(err);
    }
    })
    
    document.getElementById("memes").addEventListener('click',async()=>{
   
        const url = 'https://yesno.wtf/api'
        try{
        const res = await fetch(url);
        const memecontent = await res.json();
        const memevalue = memecontent.answer
        const memeimage = memecontent.image
        //console.log(mem)
        document.getElementById('display').innerHTML = memevalue;
        document.getElementById('image').src=memeimage;

        document.getElementById("image").style.display = "block";
        
        }
     
        catch(err)
        {
        console.error(err);
        }
        })

        document.getElementById("anim").addEventListener('click',async()=>{
   
            const url = ' https://api.thecatapi.com/v1/images/search'
            try{
            const res = await fetch(url);
            const animcontent = await res.json();
            const animimage = animcontent[0].url
            //console.log(mem)
            document.getElementById('image').src=animimage;


            document.getElementById("image").style.display = "block";
            document.getElementById("display").style.display = "none";
            }
         
            catch(err)
            {
            console.error(err);
            }
            })

            

                document.getElementById("quotes").addEventListener('click',async()=>{
                    
                    const url = 'https://type.fit/api/quotes'
                    console.log(url)
                    try{
                    const res = await fetch(url);
                    const animcontent = await res.json();
                    const animimage = animcontent[0].text
                    const author = animcontent[0].author
                    var data =  animimage  + "\n\n\n ---" + author
                    //console.log(mem)
                    document.getElementById('display').innerHTML=data;

                    document.getElementById("display").style.display = "block";
                    document.getElementById("image").style.display = "none";
                    }
                 
                    catch(err)
                    {
                    console.error(err);
                    }
                    })


                 document.getElementById("dog").addEventListener('click',async()=>{
                    
                    const url = 'https://dog.ceo/api/breeds/image/random'
                    console.log(url)
                    try{
                    const res = await fetch(url);
                    const animcontent = await res.json();
                    const animimage = animcontent.message
                    
                   document.getElementById('image').src=animimage;

                   document.getElementById("display").style.display = "none";
                   document.getElementById("image").style.display = "block";
            
                    }
                 
                    catch(err)
                    {
                    console.error(err);
                    }
                    })


                 document.getElementById("num").addEventListener('click',async()=>{
                const d = new Date()
                var mon = d.getMonth();
                mon+=1
                var day = d.getDate();
                var date = mon+"/"+day
                const url = 'http://numbersapi.com/' + date +'/date?json'
                console.log(url)
                try{
                const res = await fetch(url);
                const animcontent = await res.json();
                const animimage = animcontent.text
                //console.log(mem)
                document.getElementById('display').innerHTML=animimage;
                document.getElementById("image").style.display = "none";
                }
             
                catch(err)
                {
                console.error(err);
                }
                })


document.getElementById("bore").addEventListener('click',async()=>{
                
                const url = "https://www.boredapi.com/api/activity"
 
                console.log(url)
                try{
                const res = await fetch(url);
                const animcontent = await res.json();
                const animimage = animcontent.activity
                
                //console.log(mem)
                document.getElementById('display').innerHTML=animimage;
                document.getElementById('display').style.display="block";
                document.getElementById("image").style.display = "none";
                }
             
                catch(err)
                {
                console.error(err);
                }
                })
         