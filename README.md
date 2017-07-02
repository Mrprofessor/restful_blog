
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 



# RESTful routes used in the app

|Name  	    |Path   	        |HTTP Verb   	|Purpose   	                      |Mongoose Method
|---	    |---	            |---	        |---	                          |---
|Index   	|/blogs     	    |GET   	        |List all blogs   	              |Blog.find()
|New   	    |/blogs/new   	    |GET   	        |Show the new blog form           |NA
|Create   	|/blogs     	    |POST   	    |Create a new blog and redirect   |Blog.create()
|Show   	|/blogs/:id     	|GET   	        |Show a specific blog             |Blog.findById()
|Update   	|/blogs/:id     	|PUT   	        |Update a specific blog           |Blog.findByIdandUpdate()
|Edit   	|/blogs/:id/edit    |GET   	        |Show the edit form for one blog  |Blog.findById()
|Destroy   	|/blogs/:id/        |DELETE 	    |Delete a particular Blog         |Blog.findByIdAndRemove()