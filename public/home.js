const e = React.createElement;

const AppNav = () => (
   <nav class="navbar navbar-dark bg-dark">
       <a class="navbar-brand" href="#">Blog Posts</a>
   </nav>
);

class Home extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           title: null,
           description: null,
           email: null,
           errors: {
            title: '',
            description: '',
            email: '',
           }
       };
   }

   handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    let errors = this.state.errors;
  
    switch (name) {
      case 'title': 
        errors.title = 
          value.length < 255
            ? 'Title cannot be empty'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'description': 
        errors.description = 
          value.length === 0 || (value.length > 3 && value.length < 1000)
            ? 'Description must be 3 characters long and 1000 charachter short!'
            : '';
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
    })
  }

   render() {
       return (
           <div>
               <AppNav />
               <div class="card mt-4" Style="width: 100%;">
                   <div class="form submission">
                    <form>
                        <label>
                            Title:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Description:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Email:
                            <input type="text" name="name" />
                        </label>
                            <input type="submit" value="Submit" on={this.handleChange} />
                        </form>
                    </div>
               </div>
           </div>
       );
   }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Home), domContainer);