
/**
 * Promise Function
*/

/*

let age = 22;

const ageCheck = new Promise((resolve , reject) =>{

    if (age >= 18) {
        
        resolve(' Apu Apnar Biyar Bois Hoice. Apni Biya Korte Paren. ');

    } else {
        
        reject(' Apu Apnar Biyar Bois Hoi Nai. Apni Boro Hoia Nen. ');

    }

});


ageCheck.then((res) =>{

    console.log(res);

}).catch((error) =>{

    console.log(error);

} );

*/


/**
 * Fetch API
*/


// get elements

const productList = document.getElementById('product_list');
const productForm = document.getElementById('product_form');
const productDisplay = document.getElementById('pd_display');
const productUpdate = document.getElementById('product_update');


/**
 * get all product
*/


const getAllProduct = async () =>{

    try {
        
    await fetch('http://localhost:6060/api/v1/product')
    
    .then(res => {

    return res.json();

    })
    .then((data => {

        // admin list product

    let list = '';

    data.map((data , index) =>{

        list += `
        
        <tr>
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.regular_price}</td>
            <td>${data.sale_price}</td>
            <td>${data.stock}</td>
            <td>

            ${(data?.product_pic != "") ? `<img class="card-img" src="http://localhost:6060/product/images/${
                    data?.product_pic[0]
                  }" alt="${data?.product_pic[0]}">` : ""}

            </td>
            <td>
            <span class="badge  ${(data?.status == "published") ? `bg-success` : `bg-danger`}">${data?.status}</span>

            </td>
            <td>
            <a edit_view="${data?.id}" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_product"><i class="fas fa-edit"></i></a>

            <a class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
            </td>
        </tr>
        
        `;

    });

    if (productList) {

        productList.innerHTML = list;

    }


    // client site show product

    let LIST = '';

    const dataPublish = data.filter(data => data?.status == "published");

    dataPublish.map((data , index) =>{

        LIST += `
        
        <div class="col-md-4 mb-3">
        <div class="product-item">
            <div class="card">

            ${(data?.product_pic != "") ? `<img class="card-img" src="http://localhost:6060/product/images/${
                    data?.product_pic[0]
                  }" alt="${data?.product_pic[0]}">` : ""}

                <div class="card-body">
                <h5>Product Name : ${data.name}</h5>
                <p>
                Price : <del>${data.regular_price}</del> - ${data.sale_price} BDT
                </p>
                </div>
                <div class="card-footer">
                <div class="my-button text-center">
                    <a class="btn btn-info btn-sm" quick_view="${data?.id}" href="#single_product" data-bs-toggle="modal">View Product</a>
                    <a class="btn btn-warning btn-sm" add_to_card="${data?.id}" href="#">Buy Now</a>
                </div>
                </div>
            </div>
        </div>
    </div>
        
        `;

    });

    if (productDisplay) {

        productDisplay.innerHTML = LIST;

    }
    

})).catch(err => {

    console.log(err.message);

});

    } catch (error) {
        
        console.log(error);

    }

}

getAllProduct();


/**
 * submit product form
*/

if (productForm) {
    
    productForm.onsubmit = async (e) => {

        // prevent default
        e.preventDefault();
    
        // get form data
    
        const getFormData = new FormData(e.target);
        
        console.log(Object.fromEntries(getFormData.entries()));
    
        // error handling
    
        try {
            
            await fetch('http://localhost:6060/api/v1/product',{
    
            method : "POST",
            body : getFormData
    
            })
            .then(res =>res.json())
            .then((data => {
        
           console.log(data);
    
            //form reset
    
            e.target.reset();
    
            getAllProduct();
        
        }))
        .catch(err => {
        
            console.log(err.message);
        
        });
        
            } catch (error) {
                
                console.log(error);
        
            }
        
    
    }
    

}


/**productUpdate
 * edit product 
*/

productList.onclick = async (e) =>{

    const singleId = e.target.getAttribute("edit_view");

    console.log(singleId);

    if (singleId) {
        
        try {
            
            await fetch(`http://localhost:6060/api/v1/product`)
            .then(res =>res.json())
            .then((data => {

                const singleData = data.find(data => data.id == singleId);
        
         const formData = `
         
         <div class="my-3">
         <label for="name">Name</label>
         <input value="${singleData.name}" required name="name" id="Name" type="text" class="form-control"/>
     </div>
         <div class="my-3">
         <label for="name">Id</label>
         <input value="${singleData.id}" name="id" type="hidden"/>
     </div>
     <div class="my-3">
         <label for="regular price">Regular price</label>
         <input value="${singleData.regular_price}"  name="regular_price" id="regular_price" type="text" class="form-control"/>
     </div>
     <div class="my-3">
         <label for="sale price">Sale Price</label>
         <input value="${singleData.sale_price}"  required name="sale_price" type="text" id="sale_price" class="form-control" />
     </div>
     <div class="my-3">
         <label for="stock">Stock</label>
         <input value="${singleData.stock}"  required name="stock" type="text" id="stock" class="form-control" />
     </div>
     <div class="my-3">
         <label for="category">Category</label>
         <select class="form-control" name="category" id="category">
             <option value="">-SELECT-</option>
         </select>
     </div>
     <div class="my-3">
         <label for="brand">Brand</label>
         <select class="form-control" name="brand" id="brand">
             <option value="">-SELECT-</option>
         </select>
     </div>
     <div class="my-3">
         <label for="tag">Tag</label>
         <select class="form-control" name="tag" id="tag">
             <option value="">-SELECT-</option>
         </select>
     </div>
     <div class="my-3">
         <label for="Photo">Photo</label>
         <input type="file" name="product_pic" multiple class="form-control" />
     </div>
     <div class="my-3">
         <label for="status">Status</label>
         <select required class="form-control" name="status" id="status">
             <option ${(singleData?.status == "published") ? "selected" : ""} value="published">published</option>
             <option ${(singleData?.status == "unPublished") ? "selected" : ""}  value="unPublished">unPublished</option>
         </select>
     </div>
     <div class="my-3">
         <label for="description">Description</label>
         <textarea name="desc" class="form-control" id="description" cols="30" rows="10">${singleData.desc}</textarea>
     </div>
     <div class="my-3">
         <input type="submit" class="btn btn-primary w-100" />
     </div>
         
         
         `

         if (productUpdate) {
            
             productUpdate.innerHTML = formData;

         }



        
        }))
        .catch(err => {
        
            console.log(err.message);
        
        });
        
            } catch (error) {
                
                console.log(error);
        
            }
        
    
    }

    }


// product update


if (productUpdate) {
            
    productUpdate.onsubmit = async (e) =>{

         // prevent default
         e.preventDefault();
    
         // get form data
     
         const getFormData = new FormData(e.target);

         const formData = Object.fromEntries(getFormData.entries());
     
         // error handling
     
         try {
             
             await fetch(`http://localhost:6060/api/v1/product/${formData.id}`,{
     
             method : "PUT",
             body : getFormData
     
             })
             .then(res =>res.json())
             .then((data => {
         
            console.log(data);
     
             getAllProduct();
         
         }))
         .catch(err => {
         
             console.log(err.message);
         
         });
         
             } catch (error) {
                 
                 console.log(error);
         
             }


    }

}