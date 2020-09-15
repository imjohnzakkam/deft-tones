let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Photograph",
    artist: "Ed Sheeran",
    image: "https://wallpapercave.com/wp/wp3098878.jpg",
	path: "https://r3---sn-cnoa-jv3l.googlevideo.com/videoplayback?expire=1600218813&ei=XRJhX5WrJYSgDMeZjMgG&ip=209.127.174.8&id=o-AA6fsDbbCLNeDncTIrsXY0zT5CobJYEpSbB2ROBIlUeE&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=4259917&dur=274.241&lmt=1574997372847461&fvip=3&keepalive=yes&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgPhj0JMhP-xeFhn9IYDDDlCvLExbrmXIbQpy8wdnXM2YCIH6nTI0FIST7xEmj5wovmJ4lIIUZ2Ka72GMP3ATPcITw&ratebypass=yes&redirect_counter=1&rm=sn-a5mdk7s&req_id=baf2c5c8995ea3ee&cms_redirect=yes&ipbypass=yes&mh=nA&mip=59.98.129.187&mm=31&mn=sn-cnoa-jv3l&ms=au&mt=1600196970&mv=u&mvi=3&pcm2cms=yes&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIgCbq_g6mGgZn0uOCfIJlxJJt503gq8HXM6pRMBhqowVoCIQDuGRonkzAgbqNZ9-ejaqhpN59xgSZDnGTWofN52ISxXQ%3D%3D"
  },
  {
    name: "Hey Mama",
    artist: "Sethupathi",
    image: "https://www.filmibeat.com/img/popcorn/movie_posters/sethupathi-20160120175955-14613.jpg",
    path: "https://r1---sn-cnoa-jv3l.googlevideo.com/videoplayback?expire=1600218625&ei=oRFhX_mjAYrU8wSDsLDoDg&ip=209.127.106.85&id=o-AMTdarFoVUW4fO_AmQXcCpvvubz1MbvIxWKc5bz5Xd_S&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=4543558&dur=267.021&lmt=1540910517496037&fvip=4&keepalive=yes&beids=9466586&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOUv4n_TI5lSIGpi-jyRVGzGnrjWkf6Xrt6vC0_Y04hHAiAxNAE_0RFuVIvdyGGa0fzEYLqaLYj4NDdBND9T15HrNw==&ratebypass=yes&redirect_counter=1&rm=sn-ab5eel7z&fexp=9466586&req_id=180edbd96aa1a3ee&cms_redirect=yes&ipbypass=yes&mh=5e&mip=59.98.129.187&mm=31&mn=sn-cnoa-jv3l&ms=au&mt=1600196924&mv=m&mvi=1&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAJ_mV_j8LzRo22yiiVypbh5VCPG1qjTxKkRsrEoQzxqzAiAi6verbBqswUbInU8OiVEXeUik_qYZkRR2PyhCrtJyJQ%3D%3D"
  },
  {
    name: "Yenthara Lokapu Sundarive",
    artist: "Robo 2.0",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFRUWFxkVFxgXFRcYFxcXGBcYGBcXFxgZHSggGB0mGxgYITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLzUtLS0tLS0tLS0uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQsAvQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAgMFBgcBAAj/xABIEAACAQIEAwYDBAcFBQgDAAABAhEAAwQSITEFQVEGEyJhcYEHkaEyQrHRFCNSYsHh8CQzcoLxU3SissIVNVRjc5Oz0hYlQ//EABoBAAIDAQEAAAAAAAAAAAAAAAMEAQIFBgD/xAAvEQACAgEDAgUDAwQDAAAAAAABAgADEQQSITFBBRMiUWFxsfAjkdEygcHxM0Kh/9oADAMBAAIRAxEAPwDERS4pApYplZWJIr0U7E0nLVzX7SMxFdFeivVXEmLApQFJFOKtFUZlSY060gUV3VIt4ckxsN5OwFAvrx6oSpsnAjYFOphydgTRHcoPvSfLaisFjsu2g+ppJmIHE0KqVZgHOINbtEEdfzpp0ipjE3lYyR7g60HisJGo1U7HpVFfPWN36cIMLzI6DSclFrZ2NN0YRE1+8aNoiCRvqNR6bcvem2Wihb503dtZdxE6idNDsR5VIlGTAjNqwzMFUFmOgABJJ6ADU1xrcEg+EjcEEGRyjlXs/SvPcLEkkknckyT86mC4jddr1cqZWdiuGvE1yvSIsUoUhDTgplIOKFPMsifY00Kfc6Ae9OVgYOZQmMlKQVp8iuFaq1c8DG0FFWkptEoq1botFeTiDsadCimronTl05U9e5CvWbJfYUXV1jbtMikkMCICU60kmrbw/sobqB80ToQdwR/X1oluxIj7Vcw96K22dBXpHdcjEquHxEjzqSwdw6Dk3I7VL4XsWNyxFDcS4K2HIOYOp2IOo8jQHsQnAjtVdijLRzE8IGXMg8P4eX4VB3cPB89d9BVq4ZivDlIkNoQddDUTxLDLmO4/Chae5wxVoe2lWGQJB3GOgH4eZ0oS8p39v6+dS2ItZViNSTrtp/X4mo285gKdgSfnv+FaSNu5mTqK9vBgmmsj08jI18+fzpuiMQgBhWzCBrEcgSI8jI9qZiiTPIia9TuVYOpnSBGhHOddKar0jE9FdeJ0mPOvGkmokGcBp5TTFLRootbYMoYZhxrTlzzphDRxGbXnzrWpG5MCBbrB0p4JIkUgLRFlaKi54MqxnLSiiFXpSTag/WnbS01pa8NgwNh4guJ3nyqW7MANcKxJIFA4nDkiY239KLXH3BhLltTlCtbHhkEhs+bMZ11AqdZTu4k1PjBE0bh9lUEGASdFJAYn91dyfSjbuDcCe7cf5G/KsMtsVYMNCCCD0I1BrU+CcQbEW0AFt21K96hYIB9pAQQQC3qBB01rj9boRU2/M39NrGYFR1ljXAvlkow6EiB9ah+LcMd0aEZiRplBY/SojiGP/WsH5RlB+6v3UAGggaadDQSY5Q4jSlbNOu3Imhp7XJncFhMq6yCp101BB2oHjLQ+3pV17UE3DacAA3Ets0DclASdBVJ4sJbxcp/jpSem9bkmO7soO0j+IlQAAxLDQjJAHMEEnxfIaVGNdUPmyAjbKTO4iZ686OxzFoY7gZZ5eHYfKoy4K1kQYmZqGJMTjcDctBe8tsmaSMwIJiJ0OtBzFEX7rMZZix2liTpyGtcxCKSTbDZBH2oJHLUgAbzRc+8zHHtBq9T+GxRTNlC+IZTKgwPKdqYqcwZAjt7DMqqxiG1EEH5gHT3pg061yQBG3Pr0psio+shsdomug1yK7FTKQpWSFC5pjxTG/wC7HLbepDCarUOD86kMNckDlWnoLgGwYKxe8MuW4g8v60pzDLqKL4V4mFpoIYxry8waXZsRMcq3FqBIYRZm7RFxNdqVYtiaMwtjOQsSSYEdaOxXB3QSykfgfQ1cLtbMEx4xBLVsHTkfwqJtIFa5aeYYFTGpEMGVhO+oGnME7VPYO1rFc4xw022F0/ZchfRgP4gfQ1a85WCqbD7TIGz2buOfA6t/kvT7xbIHzq29m71rDAjMpKaPH2yS0Fo/ZmAB0EncgSXZq8BJ0iKQz4B8RLLduMJnuUZgG88tchrrXclD0nRaStR6h1jN98NibgkOJ8IZlZIJ1jSMykyROgM9aHxHZtEJbMWiTBnlrrFP3eIBptvbe0SfDnWA2XUEHkdjlp+9jVAdmPI6e0ViW2sq4E3KEHWQ2GxhvAtcds+mXeRBG3QAaRUfxA5mmjOG4UrbLuCJPhJGhmZj6f0Ki7lzWiabALS7HIEct3HTW2xBgjYHQ6nQg9PpUHideXy5/wAPlU05MErMbE6wZGxj3qMvoIbwj7Qj7Wm8xJ9N9abrPMBqVyJGMOommy5189T/AF70e1sREHNIg8o1mfePrTFyxBI0OsSNj5iikzMaowMrSYo5UUGDrrrG8c4pnLrUZgmqxGZMEcjvp0/Dc0grRLgneSec0kivZlCkFpTtPID0rzPJk8zJ5Uq5DN4FIHITJHvzq0FE22gyRPkZ/hrRCKykjeDGhnU9OtesXhbaVCvKwQ6AiSBOk8jsfzplAeQ/oVZWKnInsZGJMYHEFGBHIg/KrfgcN38XLW5nvF08J6nopGs+Rqm2hOoEQQpkmSQNSZ2kyY5VI4Va6PRaosmREb6sGXixbw9gkhg7r9kkiM22kGSPyqV4Zf7xDaeCDqJGoPkaqOGsyB+VWfs+jKwzbDr/AApu0jEWCx48CAYdOdd7QcJBwl1ZkopuKR1QZvqAR71acHwsuJB18qrvb3HDCWHtie9uqVEfdUjKXPTfTz9DWe2q5wTLGgkgiUPgXEcjgE6NprtV6wvA8xW5bvm1oNU6emwrIg5G1SeE7QXkXKHcDoIPyJ2pHW6cWepZpU3ms4M0PjXAVUB+8a4diW38iOX9Cq7hrStdAbXnHLQ7kc43qu4ntFfbdzptJ/gsD50dwLES4Jb7Wkc/5VzWqpdFOZ02itW3gHmWXtVdDhcogBQAeZAn+f1ql3Vg1oON4e1y2GVTGo15EaEeeoqtY3g5Hn6fhSWk1ComzMdSnf0leZvOm2kAE0c+DaJymJj5VGY2VMVrUuD0i2pQpyY3eamm01HT+orneDePflXbrAgdfTlRiYgSDmIuW4AhgTuQAdKZy0oORr1ke2xpM1EC2DOBa6yUqu30ZWKkQQYIPIjlXpGABAMmsDX0/CugGlhaeNqBJjXaCNI6jlV90UFeYxlJEwYG56TsCaLwyOskMUlCSQSJUg+E5dSDEQdOsb11bRJifL2HPbXepXBYQ+F8vhGkkHK0EtlMQddtCKo1gEZp0rMeINY4c323kEqXGhLGGA1HoSdeQqTwqlYPXUHkR1p5sOWYECdGRUO0NPhkkxvMzScLhihBulgsagQYWCRlBMb8tNzRdJrdj4zwYbVeHHZkDp3lnwThwIUT/W1T1vi2HtLF24oYcoJb0IUE/Os2vcUdgoWEAEeAQT1LNuT7geQqZ7M9mLmIh2/V2gdXI38kHM/SugNmV5nNuEXk8CX/AIL26XvAlpTlMjM8AzBjwgmFmOfyqidu8Vce6zsCDz8v5fT6VMJw+3ZZhbYkdT06T/XKp6z2bGJUNeBAjwkGHA8j/A6a0jdWMbxGUcAcTG1t5oA0J08v5UPmrSOJ/DlxLWLgeDGVx3bydgGHgJPmFHnQFrspiyMzYct1k2WboDMydx86muwYxA2HmVDBYIMM7khOg+03vyHnr/GpjgzWu9gIEAiIJ2nmTJJ1/wBKvXCfhnduk98wQCJAOYjQGBHODtt51YrvYG3atZRbGg1u2wzExzuWmkxpJ7tt/u0lrVWxCoj/AIdqhTaGPTv9IRwZ7fcgEeEgf6ClYng1qCRDAgwABJ21B3EVRbHam0Lb2C1wX7VwgCB3RCtlJDDYR9R56FYbtQzMZ0y+EDpMSfkPqa4jU+G21vuBnRqhfL1N3i+O8GFlSwYkHTKQJDQDyrP+L8NcEllYE6nw7evT/WtYXihuIYI01DEA5fMTVO4txu4xKtdYMsgMIIg9fQ6eUUzobbAcdYzuexNtkzq6CDqNKaBmrRiOG98rFCjHeBo3qAYkbDTrVZu2433rfrsDCZN9RQ57TwI1BjmOenmIpLPt5aUkgR50koYJ6aedEixYxzPpHnOwn57+1cLDz+X5mms1JZ6nEo1kcRSduWtFNaIfxgyD4lOhmdQdNDFM4RTvBiYmNJ3ijQI0gEtBBBGmu3l6biqMeYapAVzDsFhGuNKoN4U6iZMKF0E+/wBNqs3DOzLtbZ5gmImYG/T19veongeJ1CGYGnprsOQrV+C4tDaFwsDkB003/e61k6m6zeFHE21UV1B15JlZwHAu6td7fOXmEiGMbFjuo8t/SqT2h4kbuJugQAGKADQAIhXQcpYE+c1c/iDx4aDN0lfrWWjEEszE6mT7k/61oaTaBlZn652bG8/29pZuzFuy98C6MyjUKCJYjkddvTXSr9jsYxAAGRIhVAiRyAHIVi1vHsjB0JDKQQRuCNQR71tPYXiVvGobx/vVgMnJTzIHSdvryC7NF+RhpzmpoU2bx/qHcE4PBD3RryXkPXzq5YTDSKBwuFJIjnVkSxlTLt1NWttyJQKRK/dIVj5wR7NRF9owSEcmtr8ryrQnF1BbqBA9RzpGPYjhJ1hpkEcj3+aaCRyJG0HrJ7hXie+Rt3uUHkcttA0ejZl9VI5VKqKawVlUtoqgBQoAA2Ain6ATmEVAvSYj8bOC/o19MbaTS/4LgA8JuqNCw5FkG4/2ZneqLwx2kKNWY6xzY8h+Ar6O7YcDXG4S7hjoXWUP7NxfEjezAT5SK+f+Ef2K1cxV5ct1S1qzbbfvQSruf8B0H73pSupGVm54XackHtJTj3FBYCYNTLyDfadid0B6AaHzmo3jWMFxFXSVLEEQZEwPUaVWRiGLFmnM3inyPnzpN7E6L1E/LSPrNK16QKeJoW6kbc/n5/qSWA4a7sy2mU3FP2C0Ejkyk+E/MH1qYv8AZa7fXP3bLcE5gVImBMj5H3B61WMJjil5HH+H8q1jsf2sWyIbxKRpPKjtWc5BxFvMLVnAz8TH+I4BrTEMIqPvVpPbThJv3GuWblvK5JVWbK3muoykievMHmKoHEeH3LLZbilTynY+YPMVauwE4zzFLamAziAk0k0o02aYiTGG8OuEGJMTMcp2mpG9giTI2gMSIMA8/wCVRGCbWpyyhOhpa04bM1NGA9eInAZtBr89Jqx43i3dWwlomQDm6HbUUHwrDnxBRqULDqSOnsWPtQnEOGXSjEADKPECwB16Dc6UoSr2DM0SGqq9PWQ/FOJ94ZOpqLNz8K9etEHWm41rSRAowJzl9z2NlpO8G4OL9i86N+ttDME/aX7xHmNDTnYrtC2BxS3Nch8NxeqHf3G9N9lLl5LyvZVmK6kAEyOcgcuR9aM7b8E7p1vopW1eGZQRGVvvIfQ/SKEtpW3aT16Rp9OG062qOR1+fmfT/BmVrSOkMHUOD5HUfSl8Qu/drJPgb2xlDgLrar4rJJ+79637bj38q1bEazTaNzEbK+MyGxayDXMcJ4ZcUci30ensSKaZf7PfXqH09CW0+VMntEycS32D4V9B+FLpnANNtD1RT9BT9KGGjGNxItoXbYD5nkB6mvnj4s4K4cSmIYzbuA6cluAyR7gz10NbNx/F53yD7KfVufy2+dVjtHw9Ltgo4mCHXyZdR+XoarYMLmN6P/kAPQ9Zj160LdjKft3NT+6vIeRNQVxjOu40qwdo7SqFYuWdxmKkQVHIHX6VX2adOY2PpyPWldNyu73mx4pgOEHQCNXn59DpVj4PjRoDsRp71Vbz0Rg78COlMkTN09215c8ddOXLoy/ag858J9CIGvnUdjJewVbXKfDO4kHMJ6aDTyprBYuQJOwM+mk/QGpPE4Md176+Y/r8aQsOxp0FKi2siU29bphxUlj9CdBUY706hyMzndVWK3IncOdR61fezmBS8IZhpIEbn8qz+08GasHCeIlYynLyJkyf5AUvrK2dPScGN+F2qrENLqnBDavoVZhB3B9Iid52obtFfQYjFoCFy5Ssn7y21Jgc92Eeg0qw9m7xuFc52Ez79aieNdkna5dxrOpHeLltjUFNAwcx9rKNAPLWsWi4edttPQfucia2rZlICj8MzPiHX95o9P8AX8KEQVJ9ogi3TbtklbZKZjuxDEsfSSQPICo+yhif46j2ro1PpnM2D9QiSnZriz4W+l1DBU+x6g+RqY7fXrjFXFx2sXf1iBiTlP3k15gyPSKqRq18Fb9Kw9zCn7cd5a83Uar/AJlHzApe5Qriz94/pXNlbUZ5I4/j8+ZW+E49rF1LqEhkYEEb19Ldl+0K4qytwEZoGYecfgfzHKvl51gwdxVg7I9qLuDvI+Ym39h0kxlJmQOoOo9xzpr/ALZERS0BDW4+nx7z6RxJqPZvA56HED/gNRDcbuOoKAQ4DK41lTrK8vxqNbiF1bdy3nnNmMkZiCwgkN/GtCrpmZWu07MNvyD+xB/xNY4DdzYay3W2n/KK5xvHd1aJH2j4V9Tz9hJ9qx3sx2yxOF/VSLijTJckx5qQZHpt5Ca52h+JN138Vu34BEZiACdTvz2+VAahgYdGyJerTaVE8YvSIqiJ8R7nK0hH+M/lScX8QmIk4ZfOLhH/AEmoeokRuo7TmVztdhCt4tyfUeRG4/A+9QAOum9S/HOMnEx4AgXkGJknmSQKiFpTbsGI+X8w5gmKSGI9x6HUUlE1oy84YgHmsehkwflFPYTDLMsJj+tRXi+BzAppt9mF6ZhfC1II0nXXnI6Vb0E2ACZgEA+QqQ+H3BsPe7wun2VzL4iNfY+tOcTtW8rBEgjcCdT86wdTqw9mzHSdZo60rby+cjGfbmZxxi3HrUE5qyccuDXTWq09bWmOU5nN+MKFuOJ4UbhLsHlQQp62aM4zM6l9rZl44BxJvs5idNvTaKs+J4iUtTnDJGVSNwzEAq45GJ15xWecEuQ4qycRsE2biLu2VvZTJ+h/GsW+lfOE6eu4vTk9pR+JIQ7BvtSZ9Z1oaw8EHoane16RcUlSrG3bzT95ggBb35+c1XkNbFZ3IDObvGy0xxnEn10orhWOa1dV1MFSCPag4roFSygjBla3ZGDDtLD2zwQzLirYi3f8UD7r/fX5/QiqzNXjsmy4m1cwLxNwTaJ+7dGw8p+z8qpuIsFHKMIKkgg9RQtOxGaz1H2jOvrBIuTo33mq/BPtLbJ/7PvhSTLYdyqyDu1rNvrqR/mHMCte/wCybM/3Sj0VB/018l2rrIwdSVZSGBGhDAyCDyINfTPw67VrxDCi6xAvW4S8o5NycD9lhqOhkcqcRpnkZ4MsWD7NYUOXNhCxEeJVIj0iKk7uFw9pWuG3aRUBYnIogASTt0oUY2DABqq9vuNhra4YFgHYd7kVmYAahIUaSQCZ5COdE8t3PEoPaVPF27OMuveuWUJckjMikhdlUmOSgD286E4xwXB2rTO1lfCpYgSskbDQjcwPepzA3cOo+xegf+WB9S1VD4gcWtPlsWc2hzXcwgyACi9CNSdCdhRFHtGARKL3fP6UNeO3nR7odANz/Q+tR+M0zCdjA9P5xQLUzCLZtBgLNJmpDh+PKkSAw2g9DuJ5VGTTimgMoIwZWm1kbcDNM7FcdWzcFwk92UbSQDmGySdJJI1MaU52l41bzXLdmMuYQykmRAnfbWaqfA3AQkgEKQYIkaiNf6+7XuKEKSN51+fWsl9KhuzjmdVTd+n55POMSN4je361FPRGJaTQprVrXAnMay02WExQp23TQpy3VzAV9ZMcMOoq/cQxa2bNi9MEC6T1P6sqo+bfIGqFwW0zuAqz+XOrB23uCETYLZkD95ngn1hZ9Kyr0D3qv1+06CttumLSs8b4zcxGXvDmKDIp0nKNgTzqI511zSa1FUKMCc/ZYXbJhVi0XIVdSxAHqTAFbzgvgPhO7XvcRiDcgZshthc0ahQUJj1NYPgMR3bq43Uh/dTP8K+sU7ecNgE47DCQD/erz96kSjEyr4D4K4K0wZb+JzKZBzW5keiU7xz4N4LE3WvNdvozatkNsAnm0FDqd/eqHj/jZjlxN1LYw7WVuuqHIxLWwxCtOfWRBmKvnAO2OOxOMwwRLbYS8rM7KjZrZVDKs2aB44G2oYUMlA49zDqtz1Eg+kdsyqds/gxhsNgr+Is4i8XsobkXMhVgupHhUEGNjWWdkuPNg763ZY2z4bqK0F05j1G48x5mvqP4jf8AdeN/3a7/AMhr5CFFgFPM+nsJwvBXkW6SWtsAwc3nylSJn7VSR+HuEOaDcUNlMBpjKNAC0nck77k1hPw54xaXPh79sOWH6hipYJcYwQw5jXMNNwRzr6kQaCjecwGVJkN1lSHw9w37d0+6/wD1oG78JuHtJPeljqTn3PM7RVLxvxYxyX71vLYy27txBKNOVWIEnNvAqW7A/EjF4zHJh7q2hbYOfCpDeFSRqWPMUc037d2ePrKlsxjtV8KcPhcNcxNi7dzWouFXKlWVSCw0UEGNqxPE2jlzQYneNDvX1X8Rv+7MZG/cPHyr51xFibeQdI+VRQC45lgeMSmMsUu3T9+zp6UMhil7qyjYkoZYeFuEss25Zgo9tSfk340FirvSk4G6crjlofTl/Gm7opLb6szY80+SAIHcps084po0cTKsHM8tSOBsGQaj03qTtv4dKpYTjiNaNVJye0tPBry24UDxaEZYkiZ8WulR3a7Eh3u6k6pBP+HUR8qG4VdIYQfL56VztDhh3NnEJP6w3EuydO8V2K+koY9FpSmj9UvNTW6oGgLiV415EJ2rxorA4N3Pggkcpg9OfrTxIAmAiFjgDMGIj5UirjxHs0Vw7OWzOni0EQB9vnqNd/3a2D4ZfCvD4W3bxOJUXcSVDgMAUsk6gKuxYftHntFUqtWwEqYTUUtSQGHWZ32A+EWIxmW9is2Hw+40/W3B+6p+wP3m9ga+geD8Jw+CsC1ZVbVpBJk9Bqzsdz5mu8d4sMNbNzurt0/dSzba47HpAEAeZgVkvaHEcXxxu272FuWsO9tu7torESBmXvG3ZtI1ga7Vd22jOJWio2ttyB7kniMfFn4q2btm5gcEe8DjJdvfcy/eW3+1O2baNp3rEjU1j+y2NtKzvg8QqLqzNZcKAOZJEAedMcK7P4rEjNh8PdugHKWS2zKDvBYCAYj51brB8DvJPsCyLjcOzbC6sz6ivrmvjrFcIxODu2xftPZYkFc6kSARJHWvsRNh6V74kH3E+Qe0bZcbif8AeLv/AMjVbvg2f/2mH8xd+lpqiO1PZbHPjcS6YLEsrX7hUiy5BBckEGNRVj+EfZ3GWeJ2Ll7C37aAXJZ7TqoJtsBJIgTWkLv02B9oMdJtnbO0GwOIU87TDrXzpiLBVip3BIPqK+lO0Mfo16dP1bH5AmsC4jgw361NVYn/ACsNSD8x86t4egcEd54vgyn3cJrl58vSojG4Q22ykbiR6SR+INaJa7PAMLl1lUAByu5K6HUabg7TQ/aa2mLwz3FX9bYJuA6S1o/3imOaiG8grDnTWu026jcOokJYN+O0o1lsoO22o579etE4uzlPUdfUTQYfwnSpHGAwrdRNc2w7zYp5UiRdwUw1E3aHarKYras9bFSWHXwkc6EsCnkczVbOYfTALyYTg3ifSk2OK/qLuHZMwdhcVpgo40mI1BGh23peTLHKWVdeUmf4VFqsGvV+89qichZ1Vqy9kMESblyD4FSIBPia6nT90MfaoHDAZhNbL2PwOGXCls4zkhiumuUMAP8AiNC1JOw4ntLhbQYPhGQ3CrKSrAq4g6qdCBWt4ftRgtEGKsyPDBuKDK6EHXeazPhNwG+CNNRr5TMaVmXbW/GJuBRBN26W9RdcCBy0/Cs7wyzFrJj2/wAx7xercAw7f5n0/f7SYNBLYqwo87qfnQt3tnw9VDtjLAVpynvFgxvB518i3bjHeflVhtePh/U2rvyV1/NPrWxbYExgd5laXSm7cCegzN17e9teH3eHYu3bxlh3ew6qq3AWZisAACqn8CO02DwuCvW8RibVlziCwV3CkqbdsSJ5SCPasYt4cs0ASaNPB2GhZFPQsoPvrp71JsUSE0djDIE0L479oMNib2EbDX7d7u1uZsjBgCWQgEjrBrX+F9vOHXrauuLtDwhirMFZdNcynURXylisG9sw6xOo6EdQdiPMVL8CMWb79Ej5kD86q9m1ciG02j82zy2OOv8AM+mv/wA94Z/47D/+6v511e3XDSYGOw5P/qr+dfI7NRWDbxA9J/CjLg9Yp5fPBn0n267c4H9Cv27eJt3LroVREYM0tpJjYeZrE+HcYuWpyNE6wQGEjYwwIkdahbjaz7U5buU3Q/lniSaYfjeJXXnM7EneTvTvZvjIS4C+0gE9QdCGHMEe9A4W2GuohMBnVSfIsAfxqOQlTB604mpYnaTBPTgZhuK4N/av0e1OW4w7snWEY6ZupXUHzU0u9JsZCNben/FBHnqTUknEStrvckXArC245ZiAxM8xoRGxIPOojC2ibdw8lyj1LSQPkrn2rF1A2MQJqaMZXJka6UNcFF3KFuGhpK3qBC8JYMwN/UD6mkMdaU78wRSbDwQRoRsar8wnAwohUZmsp1eT6Aj+dRrvJJHMk/M1Ju5Ds/NLRM/vP4R9XFRLaaVdOkBqj6v7/bA/mOB6u/ZPEsqaz12B0GkQfXSqNhUzOBMAkCeknerPh8R4ImCDp56EQDvGtB1S7l2xjw7G/cZp2Gxls3D+0w0gAEwDp5EnasY41dZrrZhBByx0y6c+dWZMa7DMWMiADI20iB686r3aW+Hvs43YAtG2ePEfnSmho8pz8xvxIg1hhIomrD2bfNaxFrqmYeqEN+E1XZqY7J3IxCqdnBQ+jCP40/eP0zEPDnxqFHvx+8kuDYYi0zroxOXN+ysEufLQfU0TbwdsBdVUkTLrmJHWCco9PrQ/CMYF73DsQJOhJgSOU8gevpSsbicToiqw5DQkkRG/P2pNtxYzdpNa19M4+8IxmALWrinJlVO8Qhl+0CM+RZkKVPpIFROF8OBut+06r/zH8qcvMbFp87TduDLEyVWQSW6EwBHSfKmr+nD0/evH6Kv50RQcAfIijMN7sBghGkCWp7D3CNaHNO2adPEwaz6pOYXBtc1XbYeZOgHzge9CI1ewuPuWwAraB1f3Uzp76+1Lxcd40bTTCNu5hm4jtq9lZW/ZIPyINc4vbyXbifsuwHzoaaL4jcDlX5lVzf4gIb8J96Yr/rEo5zWRHsDckw2siIPTpT/EFFoph1MiTcJ/azjwfJI9y1d7NWg+IQNtOvoNSPcCPepfjfDM9lMQo1tPkeP9m5lT7MSP8/lU6/TejeO0nQ27XUHuZSrtCXDRV7mKEc1lpC6gzoNOg+1NEU7YWWUdSP51YwKZzC7rwt0ftOie1sEn65ai2NE3r+Yf5mY+ZaP4Cn8Bw8PZv3Z/uu706h2Kn5afOvf0jmVsO9sD87wjgfDS8MVJBMA+hBJ3naeR50fctgXGAhioU848wOv2gOW3Pm3w+7Frwucw2AkRtOuxkSIn+bujLm1BhlYqJ/wiOm0+VLOxLHM1aKlVBj6wnHY63bTLa0JWGPi1k7a7EaA/4dzVTumnsVcMDTmTPXahSaNVWFER1V5c49pyjOE3Mt62ejCgqcsPDKehH41dhlSIvQ+yxW9iIbxiRfeNPFXE4lcAgOQPf86Vx0/rSesH6VHzVEUMgyI3qbGr1FgQ9zF3nJ3M1N3Rm4ev7t0z7gflUDU3g7s4O6vRlP41Fo4H1ltE25rAe6H+ZBGnLRpulIaMZnqcGF2zRmJEQDvlVj6MJH0j50AjU87yx6yB9DUVttaOMQyfMcWl5qbRhFdJrWrGMGIs2RJrs2Yv2zyDrPpIn6TWy8D4CLeFuWrqZzezpGuiAET6/kKp/wAMeBWGtjEX832yLYER4ACSeupgeYq5/ELtKbFsIkLcdVbTdQddfenL82YpQdev594qLSOnYzAOO4F8PfuWbghkYg+Y3VvQqQfeopjUpx6+1y4brElm+0SZJPU1EmsK2nyrCsda0uMmPZhHTfznp6V20dzMQDHyNMzROFABVt9ScsTttpz1oUlTzBKLwV0w1sGBcgHTciSo9JihWFOWrpXb8AR8jUkZlEO05kkhZAVYAiMwM9YWVMa+nl5Uq3fe24IPkSrSG5+n+lAlhkAAOhknlOutEWBmBGs6RvAnfyFDIHeOI5zgSetcBTFq98X7dkC4qZWywFLJLMS4jS4Y0IOQ6jevJ2LQmP0tF1AOYWgbchSBeAvHISSQoXPJGpXkNwixhlvG1irede5e6pN7uoYWXuopIBkvFtY/e0mpK7wvhz4YlMq3/wBHF5V/SSX7w3IFvKyC2QFOozh4BOWroBtGIteSbCTI+32TQ4hrP6SohFfa3nBZspVl73IMo8RhyQsGNwOP2Vth8Moxdtu+YIxAUi2TbR9PHqPHAzZCSp03g8dnMBmsxikfJ3lvFDvQP1gtuyXLRIAa2bilJBOiof8A+kB/Adl8L+lMbjWmwxsK1qMbh1ZrmW0XB/WArBa5o2X7MTVoGR+P7NobhnF2xBa3qIfOil9UzaIUAOed2CxM1C8W4Hdsu6kZlQsAwKkMBJDaExIE1crvBeGQyEorlcQV/tYLju83dKgUNaYmF0e4s5tCTUR2T4Tg7tpWvZWZrpS6WxlrDnD2hki6iXNbxOZzpP2AIk6wBgS9jlmJMFPZi33aXRjLOW5bZ1GmcMtt7jK6BiUAyZZ3zEAAjUk4rs6tmy8Yq28sqaZcsm5kgHPmzAQ5BUDKQZ5UvG8G4eMM9y3iJurhbbm2zAZ7r3LYzW43hS4a0dVgHUTl7h+E4L9ERwQ1wrbaTiraM9431R8MbJ8VtRbJbvToImYMV4jMmtyhyPmLvdhra5v7YnhZVMqnhDPkzXIvEII8Y38JBMUwOxqZLjnEhCn3bi21I8DMDci8cqkgCVzHxLpR3GuB4BL+E7vLkZiMSn6XZfKhe2isHRmj7ZO5MITAAJoUcGwXfYSGBtM7WsR/aLYIHfmyt4E6iVKvEEQOhqZSEYjsOiZ/7WDkKj+7UZsxAkE3oO+gBJMeYmrcStIl51tXe9QQVcKUzaAnwkmIJI35VbMZwHh68PN1bim+LSsG/SbRzXTcAa33IbP9ktpk5fa5mj5tqgwikxxLmvkaLsrJAqObepjgDS/7yiR9Ndd4En2rR0DBnFZgbuOZuPY2wtjCW7uh7u2FUbjvGJa43sCsetUzt3xE3ruczmyw3pJIj2Me1W/spc7zDvhzuUDWteYDTPkRA9qzbtY7ZzI12PtpW1VWBY5PUfb8/wDYkpOZW7tnOxQRroPXoIB1nQVCMIqUuMdTQGJ1aRWHrBlsiOL0jM0ZhyFQvu0wJiB5x1oKiF/uz6j+NIGGQ9c+0ZY1ya8a9UwcfS94cpncR08yRzNStt7cwG8JgH+LaxrUHSqoyZjFV5TtCeL443r1y6RGdiwHQE+FfYQPahK5XTV4vmcr1ertenp1q5XWpNekmdmlJz9KRSl516eE8KUKSK7XpIjlJrwrriolz0nDtTuBxJturgTB26jYj5U0hpJqysVOR1Eq3ImtcI7QhMRYu2Wle5jlppLKR1DAj/Wj+1z28bZZktql5B3kr9/Txz101H+GKzDsox75ROkjT10NXThV5s1rXmB7SNPqa6rTbdRULSMNM512NxKRfBjXZZA05zOvU1FvV+7YWFGCtMFAJuCSBqfDc3PPYfKqC+9Ymoxk49zNG2o1EKfYH9xmf//Z" ,
    path: "https://r2---sn-cnoa-jv3l.googlevideo.com/videoplayback?expire=1600221505&ei=4RxhX7PlG-SkhwaEwoaABQ&ip=209.127.253.14&id=o-AHzdLhEEbSXXHfUSNzCv1RyhzNVKgiEd8Pjrm3aGUpKS&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=2727643&dur=157.361&lmt=1576496596860522&fvip=2&keepalive=yes&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgEBzGRetTFYDb-UDke1Dtdh2LUNGRBKVvbVFjqpk-MWECIDSEtjgLd66ZLXUT591M0fNkOXAQYAePtN-ijfsogxKi&ratebypass=yes&redirect_counter=1&rm=sn-ab5ee77l&req_id=b71074af4efda3ee&cms_redirect=yes&ipbypass=yes&mh=YF&mip=59.98.129.187&mm=31&mn=sn-cnoa-jv3l&ms=au&mt=1600199802&mv=m&mvi=2&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgPTFknd_yW6V1FpbCHigPO6oHTOUcQ74qlcDVJFvksvoCIQDfgKeq6qzY9qvuGml2ywjnxN0-H8FMAbJ5_nn2IMvr1g%3D%3D",
  },
];

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}