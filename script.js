import express from "express"
import bodyParser from "body-parser"
import { fileURLToPath } from "url"
import { dirname } from "path"

const app = express(),
      __fileName = fileURLToPath(import.meta.url),
      __dirName = dirname(__fileName),
      URLencodedParser = bodyParser.urlencoded({ extended: false })


app.set("view engine", "ejs")

app.use("/CSS", express.static(__dirName + "/CSS"))

app.listen(3000, () =>{

    console.log('Server is running on port 3000')
   
    app.get("/", (request, response) =>{

        response.render("index")

    })

    app.get("/about", (request, response) =>{

        response.render("pages/about")

    })


    app.get("/profile/:name", (request, response) =>{

        const data ={ 
            age: 29, 
            job: "Web Developer", 
            hobbies: ["Coding", "Gaming", "Reading"] 
        }

        response.render("pages/profile", { person: request.params.name, data })

    })


    app.get("/contact", (request, response) =>{

        response.render("pages/contact", { qs: request.query })

    })


    app.post("/contact", URLencodedParser, (request, response) =>{

        console.log(request.body)

        response.render("pages/contact-success", { data: request.body })

    })


    app.use((request, response) =>{

        response.status(404).render("pages/404")

    })

})