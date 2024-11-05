const express = require('express');

const app = express();
app.use(express.json());

const generateShortUrl = () => {
    const characters = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];

    let url = '';
    for (let i = 0; i < 10; i++) {
        url += characters[Math.floor(Math.random() * 62)];
    }
    return url;
}

const urlMap = new Map();
const analyticMap = new Map();

app.post('/url', (req, res) => {
    const { url } = req?.body;
    try{
        let isUrlPresent = true;
        while(isUrlPresent){
            shortUrl = generateShortUrl()
            isUrlPresent = !!urlMap.get(shortUrl);
        }
        urlMap.set(shortUrl,url);
        analyticMap.set(shortUrl,0);
        return res.json({
            type:"success",
            shortUrl : `http://localhost:3000/${shortUrl}`
        })

    } catch(e){
        return res.json({
            type:"error",
            message:"Some error occurred",
            error:e.message
        })
    }
})

app.get('/:id', (req, res) => {
    const shortUrl = req.params.id;
    try{
        const originalUrl = urlMap.get(shortUrl);
        if(originalUrl){
            res.redirect(originalUrl);
            let count = analyticMap.get(shortUrl);
            analyticMap.set(shortUrl,count+1);
            console.log(analyticMap);
            return;
        }
        
        return res.json({
            type:"error",
            message:"Invalid Url"
        })
    } catch(e){
        return res.json({
            type:"error",
            message:"Some error occurred",
            error:e.message
        })
    }
})

app.get('/url/analytics/:id', (req, res) => {
    const shortUrl = req.params.id;
    try{
        const isDataAvailable = analyticMap.get(shortUrl);
        if(isDataAvailable || isDataAvailable == 0){
            const count = analyticMap.get(shortUrl);
            return res.json({
                type:"success",
                message:`Site has been visited ${count} times`
            })
        }
        return res.json({
            type:"error",
            message:"Invalid Url"
        })
    } catch(e){
        return res.json({
            type:"error",
            message:"Some error occurred",
            error:e.message
        })
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})