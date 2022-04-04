const express = require('express')
const app = express()
const port = process.env.PORT || 5000


// set view engine hbs
app.set ('view engine', 'hbs')
// set public path/folder
app.use('/public', express.static(__dirname + '/public')) 

app.use(express.urlencoded({extended: false}))


let blogs = [
    { 
        title: 'Kyaa',
        author : 'Yusuf Fauziyan',
        duration: '1 Month',
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia dolores nostrum corporis sit modi optio! Voluptatum, eius asperiores! Nemo sit corporis doloribus fugiat quia quo? Praesentium quisquam nulla quam...',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia dolores nostrum corporis sit modi optio! Voluptatum, eius asperiores! Nemo sit corporis doloribus fugiat quia quo? Praesentium quisquam nulla quam...',
        nodejs: 'nodejs',
        react: 'react',
        javascript: 'javascript',
        vuejs: 'vuejs'
    },
    {
        title: 'Ashiapp',
        author : 'Yusuf Fauziyan',
        duration: '1 Month',
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia dolores nostrum corporis sit modi optio! Voluptatum, eius asperiores! Nemo sit corporis doloribus fugiat quia quo? Praesentium quisquam nulla quam...',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia dolores nostrum corporis sit modi optio! Voluptatum, eius asperiores! Nemo sit corporis doloribus fugiat quia quo? Praesentium quisquam nulla quam...',
        nodejs: 'nodejs',
        react: 'react',
        javascript: 'javascript',
        vuejs: 'vuejs'
    },
]

app.get ('/', (req, res) => {
    res.render('index', {title: 'Halaman Home', blogs})
})

app.get ('/contact', (req, res) =>{
    res.render('contact', {title: 'Halaman contact'})
})

app.get ('/add-project', (req, res) =>{
    res.render('add-project', {title: 'Halaman AddProject'})
})

// Show project after submit
app.post('/add-project', (req, res) => {
   let data = req.body
    console.log(data);
    data = {
        title: data.title,
        desc: data.description.slice(0, 250) +'...',
        description: data.description,
        image: data.image,
        duration: abtDuration(data.sDate, data.eDate),
        sDate: data.sDate,
        eDate: data.eDate,
        author: 'Yusuf Fauziyan',
        //icon
        nodejs: data.nodejs,
        react: data.react,
        javascript: data.javascript,
        vuejs: data.vuejs
    }
    blogs.push(data)
    console.log(blogs);
    res.redirect('/')
})

app.get ('/update-project/:index', (req, res) =>{
    let index = req.params.index
    let blog = blogs[index]
    res.render('update-project',{update: blog, index})
})
// update
app.post('/update-project/:index', (req, res) => {
    let data = req.body
    let index = req.params.index
    
    blogs[index].title = data.title
    blogs[index].sDate = data.sDate
    blogs[index].eDate = data.eDate
    blogs[index].duration = abtDuration(data.sDate, data.eDate),
    blogs[index].nodejs = data.nodejs
    blogs[index].react = data.react
    blogs[index].javascript = data.javascript
    blogs[index].vuejs = data.vuejs,
    blogs[index].description = data.description
    res.redirect('/')
})

// Showing blog detail by index
app.get('/blog/:index', (req, res) => {
    // console.log(req.params)
    let index = req.params.index
    let blog = blogs[index]
    res.render('blog', blog)
})

// Delete
app.get('/delete-project/:index', function(req, res) {

    let index = req.params.index

    // console.log(index);
    blogs.splice(index, 1)

    res.redirect('/')
})

app.use ('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

function abtDuration(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let duration = end.getTime() - start.getTime();
    let year = Math.floor(duration / (1000 * 3600 * 24 * 30 * 12))
    let month = Math.round(duration / (1000 * 3600 * 24 * 30));
    let day = duration / (1000 * 3600 * 24)
  
    if (day < 30) {
        return day + ' Day';
    } else if (month < 12) {
        return month + ' Month';
    } else {
        return year + ' Year'
    }

}

app.listen(port, () =>{
    console.log(`Server listen at http://localhost: ${port}`)
})