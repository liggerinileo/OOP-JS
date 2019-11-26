// Product Constructor
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// UI Constructor
class UI {
    addProduct(product) {
        let productList = document.getElementById('product-list');
        let element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Succsssfully', 'success');
        }
    }

    showMessage(message, cssClass) {
        let div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        let container = document.querySelector('.container');
        let app = document.querySelector('#App');
        // Insert Message in the UI before app
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function (e) {

        let name = document.getElementById('name').value,
            price = document.getElementById('price').value,
            year = document.getElementById('year').value;

        // Create a new Product
        let product = new Product(name, price, year);

        // Create a new UI
        let ui = new UI();

        // Inputs Validation
        if (name === '' || price === '' || year === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        }else{
            // Save Product
            ui.addProduct(product);
            ui.showMessage('Product Added Successfully', 'success');
            ui.resetForm();
        }


        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', function (e) {
        let ui = new UI();
        ui.deleteProduct(e.target);//e.target se refiere cuando se clickea el elemento 
        e.preventDefault();
    });