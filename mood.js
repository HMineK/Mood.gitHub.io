const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const searchIcon = $('.ti-search')
const player = $('.player')
const input = $('input')
let autocom_box = $('.autocom_box')
let ul = autocom_box.querySelector('ul')
const playlist = $('.playlist')
const playBtn = $('.btn-toggle-play')
const audio = $('.audio')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const urlyt = $('.urlyt')
const thumb = $('.thumb')
const content = $('.content')
const content2 = $('.content_2')

const page = {
    suggestions: [
        'Akali',
        'Zoe',
        'Aurelion Sol',
        'Zed',
        'Ahri',
        'Thresh'
    ],

    infor: [
        {
            champ: 'Akali',
            image: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Akali_0.jpg'
        },
        {
            champ: 'Zed',
            image: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Zed_0.jpg'
        },
        {
            champ: 'Zoe',
            image: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Zoe_0.jpg'
        },
        {
            champ: 'Ahri',
            image: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ahri_0.jpg'
        },
        {
            champ: 'Aurelion Sol',
            image: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/AurelionSol_0.jpg'
        },
        {
            champ: 'Thresh',
            image: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Thresh_0.jpg'
        },
    ],

    songs: [
        {
            champ: 'Akali',
            name: 'Most Epic Music Ever: "The Wolf And The Moon" by BrunuhVille',
            path: './Media/Akali/1.mp3',
            url: 'https://www.youtube.com/watch?v=HEf_xrgmuRI&feature=youtu.be'
        },
        {
            champ: 'Akali',
            name: 'whogaux - i don\'t care [NCS Release]',
            path: './Media/Akali/2.mp3',
            url: 'https://www.youtube.com/watch?v=qTG2KAiuoSA&feature=youtu.be',
        },
        {
            champ: 'Akali',
            name: 'Damon Empero ft. Timmy Commerford - Lost ',
            path: './Media/Akali/3.mp3',
            url: 'https://www.youtube.com/watch?v=raiUPQJVDBI',
        },
        {
            champ: 'Akali',
            name: 'Damon Empero - I Promise | Electro House | | No Copyright |',
            path: './Media/Akali/4.mp3',
            url: 'https://www.youtube.com/watch?v=M48uhVXIu2A',
        },
        {
            champ: 'Zed',
            name: 'Bad Habits (9D Audio)',
            path: './Media/Zed/1.mp3',
            url: 'https://www.youtube.com/watch?v=L4gVE3XswN8&feature=youtu.be',
        },
        {
            champ: 'Zed',
            name: 'Dishonored [Soundtrack] - Drunken Whaler',
            path: './Media/Zed/2.mp3',
            url: 'https://www.youtube.com/watch?v=urV8MIcLDFk&feature=youtu.be',
        },    
        {
            champ: 'Zed',
            name: 'Konrad Mil - Break The Rules',
            path: './Media/Zed/3.mp3',
            url: 'https://www.youtube.com/watch?v=3G1njUxp9Fs',
        },
        {
            champ: 'Zed',
            name: 'Gryffin - Body Back (Nick Project Remix)',
            path: './Media/Zed/4.mp3',
            url: 'https://www.youtube.com/watch?v=1anhQSRzxcc',
        }, 
        {
            champ: 'Aurelion Sol',
            name: 'Axel Johansson - The River',
            path: './Media/Aurelion Sol/1.mp3',
            url: 'https://www.youtube.com/watch?v=Nla5XQGjgOI',
        },
        {
            champ: 'Aurelion Sol',
            name: 'Mike Perry - The Ocean',
            path: './Media/Aurelion Sol/2.mp3',
            url: 'https://www.youtube.com/watch?v=mGQFZxIuURE',
        },    
        {
            champ: 'Zoe',
            name: 'Ori and the Blind Forest - Main Theme ',
            path: './Media/Zoe/1.mp3',
            url: 'https://www.youtube.com/watch?v=76qRF5-qvZM',
        }, 
    ],
    
    render: function() {
        const _this = this
        input.onkeyup = (e) => {
            let useData = e.target.value
            let emptyArray = []
            if (!useData) {  
                autocom_box.style.display = 'none'
            }else{
                emptyArray  = _this.suggestions.filter (data => data.toLocaleLowerCase().startsWith(useData.toLocaleLowerCase()))
                
                emptyArray = emptyArray.map(data => data = `<li>${data}</li>`)

                
                _this.showSuggestions(emptyArray)

                let allList = ul.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    allList[i].onclick = function() {
                        let selectData = this.textContent;
                        input.value = selectData;
                        autocom_box.style.display = 'none' 
                    } 
                }
         
                let a = new Promise(function (resolve) {
                    searchIcon.onclick = (e) => {
                        _this.showContent2() 
                        let img = _this.infor.map((course) => {
                            if(course.champ === input.value || course.champ.toLocaleLowerCase() === useData.toLocaleLowerCase() ){
                                    return`
                                    <img src="${course.image}" alt="">  
                                `                        
                            }  
                        })
                        thumb.innerHTML = img.join('')
                
                        let playListSong = _this.songs.filter((course) => {
                            if(course.champ === input.value || course.champ.toLocaleLowerCase() === useData.toLocaleLowerCase()){
                               return course.champ
                            }
                        })
                        resolve (playListSong)
                    } 
                })
                a
                .then(function(playListSong) {
                    let app = {
                        currentIndext: 0,
                        isPlaying : false,
                        isRandom: false,
                        isRepeat: false,
                        song : playListSong,
                        render2 : function() {
                            __this= this
                            let htmls = this.song.map((courses, index) =>{
                                return`
                                   <div class="song ${index === this.currentIndext ? 'active' : ''}" data-index = "${index}">
                                       <h3 class="title">${courses.name}</h3>
                                   </div> 
                                   `         
                           })
                           playlist.innerHTML = htmls.join('')   
                           //play Music
                           playBtn.onclick = function() {
                               if(__this.isPlaying) {
                                   audio.pause()
                               } else {
                                   audio.play()
                               }
                           }
                           //khi adio play
                           audio.onplay = function() {
                               __this.isPlaying = true
                               player.classList.add('playing')
                              
                           }
                           //khi audio pause
                           audio.onpause = function() {
                               __this.isPlaying = false
                               player.classList.remove('playing')
                           }
                           //aidio time
                           audio.ontimeupdate = function() {
                               if(audio.duration){
                                   const progressTime = Math.floor(audio.currentTime/audio.duration * 100)
                                   progress.value = progressTime
                               }
                           }
                   
                           progress.onchange = function(e) {
                               const seekTime = audio.duration/100* e.target.value
                               audio.currentTime =seekTime
                           }
                   
                           //click Next button
                           nextBtn.onclick = function() {
                               if (__this.isRandom){
                                   __this.randomSong()
                               }else {
                                   __this.nextSong()
                               }
                               audio.play()
                               __this.render2()
                           }
                           //pclick prev button
                           prevBtn.onclick = function() {
                               if (__this.isRandom){
                                   __this.randomSong()
                               }else {
                                   __this.prevSong()
                               }
                               audio.play()
                               __this.render2()
                           }
                           // khi audio end
                           audio.onended = function() {
                               if (__this.isRepeat) {
                                   audio.play()
                               }else{
                                   nextBtn.click()
                               }
                               
                           }
                           // khi click random button
                           randomBtn.onclick = function() {
                               __this.isRandom = !__this.isRandom
                               randomBtn.classList.toggle('active' , __this.isRandom)
                           }
                           // khi click repeat button
                           repeatBtn.onclick = function() {
                               __this.isRepeat = !__this.isRepeat
                               repeatBtn.classList.toggle('active' , __this.isRepeat)
                           }
                           // khi click vao playlist
                           playlist.onclick = function (e) {
                               const songNode = e.target.closest('.song:not(.active)')
                               if (songNode) {
                                   __this.currentIndext = Number(songNode.dataset.index)
                                   __this.loadCurrentSong()
                                   __this.render2()
                                   audio.play()
                               }
                           }
                        },
                        defineProperties: function() {
                            Object.defineProperty(this, 'currentSong', {
                                get: function () {
                                    return this.song[this.currentIndext]
                                }
                            })
                        },
                    
                        loadCurrentSong: function() {
                            const nameSong = $('.songName')
                            const ytLink = $('.urlyt a') 
                            
                            nameSong.textContent = this.currentSong.name
                            audio.src = this.currentSong.path
                            ytLink.href = this.currentSong.url
                        },
                        nextSong: function () {
                            this.currentIndext++
                            if (this.currentIndext >= this.song.length ){
                                this.currentIndext = 0
                            }
                            this.loadCurrentSong()
                        },
                    
                        prevSong: function () {
                            this.currentIndext--
                            if (this.currentIndext<0 ){
                                this.currentIndext = this.song.length -1
                            }
                            this.loadCurrentSong()
                        },
                    
                        randomSong: function() {
                            let newIndex
                            do {
                                newIndex = Math.floor(Math.random() * this.song.length)
                            }while (newIndex === this.currentIndext)
                            this.currentIndext = newIndex
                            this.loadCurrentSong()
                        },
                    
                        start: function() {
                            this.defineProperties()
                            // this.answerSearch()
                            this.loadCurrentSong()
                    
                            this.render2()
                        }
    
                    }
                    app.start()
                })
        }
    }
    },

    showSuggestions: function (list) {
        let listData
        if(!list.length) {
            userValue = input.value;
            autocom_box.style.display = 'none'
        }
        else{
            autocom_box.style.display = 'flex' 
            listData = list.join('')
            ul.innerHTML = listData
        }
    },

    showContent2: function () {
        content.style.display= 'none'
        urlyt.style.display = 'block'
        content2.style.display= 'block'    
    },

    start: function() {
        this.render()
    }
}

page.start()
