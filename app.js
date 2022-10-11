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
// product
const productList = document.getElementById("product_list");
const productForm = document.getElementById("product_form");
const productDisplay = document.getElementById("pd_display");
const productUpdate = document.getElementById("product_update");
const productSingle = document.getElementById("single_show");
// tag
const tagDisplay = document.getElementById("tagDisplay");
const tagForm = document.getElementById("tag_form");
const TagDisplay = document.getElementById("TagDisplay");
const TagForm = document.getElementById("TagForm");
const updateTagForm = document.getElementById("update_tagForm");
// category
const categoryDisplay = document.getElementById("categoryDisplay");
const CategoryForm = document.getElementById("Category_form");
const categoryForm = document.getElementById("categoryForm");
const CategoryDisplay = document.getElementById("CategoryDisplay");
const updateCatForm = document.getElementById("update_catForm");
// brand
const brandDisplay = document.getElementById("brandDisplay");
const brandForm = document.getElementById("brand_form");
const BrandForm = document.getElementById("BrandForm");
const BrandDisplay = document.getElementById("BrandDisplay");
const updateBrandForm = document.getElementById("update_brandForm");

/**
 * get all product
 */

const getAllProduct = async () => {
  try {
    await axios
      .get("https://online1shop.herokuapp.com/api/v1/product")
      .then((res) => {
        // admin list product

        let list = "";

        res.data.map((data, index) => {
          list += `
        
        <tr>
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.regular_price}</td>
            <td>${data.sale_price}</td>
            <td>${data.stock}</td>
            <td><img class="card-img" src="https://online1shop.herokuapp.com/product/images/${
              data?.product_pic[0]
            }"></td>
            <td>
            <span class="badge  ${
              data?.status == "published" ? `bg-success` : `bg-danger`
            }">${data?.status}</span>

            </td>
            <td>
            <a edit_view="${
              data?.id
            }" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_product"><i class="fas fa-edit"></i></a>

            <a delete_item="${
              data?.id
            }" class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
            </td>
        </tr>
        
        `;
        });

        if (productList) {
          productList.innerHTML = list;
        }

        // client site show product

        const dataPublish = res.data.filter(
          (data) => data?.status == "published"
        );

        let LIST = "";

        dataPublish.map((data, index) => {
          LIST += `
        
        <div class="col-md-4 mb-3">
        <div class="product-item">
            <div class="card">

            <img class="card-img" src="https://online1shop.herokuapp.com/product/images/${data?.product_pic[0]}">

                <h5 class="mt-3 text-center">Name : ${data.name}</h5>
                <p class="text-center">
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

getAllProduct();

/**
 * submit product form
 */

if (productForm) {
  productForm.onsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      axios
        .post("https://online1shop.herokuapp.com/api/v1/product", formData)
        .then((res) => {
          e.target.reset();

          getAllProduct();
        })
        .catch((err) => {
          console.log(err.massage);
        });
    } catch (error) {
      console.log(error.massage);
    }
  };
}

/**productUpdate
 * edit product
 * delete product
 */

if (productList) {
  productList.onclick = async (e) => {
    const singleId = e.target.getAttribute("edit_view");

    if (singleId) {
      try {
        await axios
          .get(`https://online1shop.herokuapp.com/api/v1/product`, singleId)

          .then((res) => {
            const singleData = res.data.find((data) => data.id == singleId);

            const formData = `
             
             <div class="my-3">
             <label for="name">Name</label>
             <input value="${
               singleData.name
             }" required name="name" id="Name" type="text" class="form-control"/>
         </div>
             <div class="my-3">
             <label for="name">Id</label>
             <input value="${singleData.id}" name="id" type="hidden"/>
         </div>
         <div class="my-3">
             <label for="regular price">Regular price</label>
             <input value="${
               singleData.regular_price
             }"  name="regular_price" id="regular_price" type="text" class="form-control"/>
         </div>
         <div class="my-3">
             <label for="sale price">Sale Price</label>
             <input value="${
               singleData.sale_price
             }"  required name="sale_price" type="text" id="sale_price" class="form-control" />
         </div>
         <div class="my-3">
             <label for="stock">Stock</label>
             <input value="${
               singleData.stock
             }"  required name="stock" type="text" id="stock" class="form-control" />
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
             <input type="file" name="product_pic" class="form-control" />
         </div>
         <div class="my-3">
             <label for="status">Status</label>
             <select required class="form-control" name="status" id="status">
                 <option ${
                   singleData?.status == "published" ? "selected" : ""
                 } value="published">published</option>
                 <option ${
                   singleData?.status == "unPublished" ? "selected" : ""
                 }  value="unPublished">unPublished</option>
             </select>
         </div>
         <div class="my-3">
             <label for="description">Description</label>
             <textarea name="desc" class="form-control" id="description" cols="30" rows="10">${
               singleData.desc
             }</textarea>
         </div>
         <div class="my-3">
             <input type="submit" class="btn btn-primary w-100" />
         </div>
             
             `;

            if (productUpdate) {
              productUpdate.innerHTML = formData;
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error.massage);
      }
    }

    // delete product

    const deleteId = e.target.getAttribute("delete_item");

    if (deleteId) {
      try {
        if (confirm("Are You Sure ? You Want To Delete This Product !!")) {
          await axios
            .delete(`https://online1shop.herokuapp.com/api/v1/product/${deleteId}`)

            .then((res) => {
              getAllProduct();
            })

            .catch((err) => {
              console.log(err.massage);
            });
        }
      } catch (error) {
        console.log(error.massage);
      }
    }
  };
}

// product update

if (productUpdate) {
  productUpdate.onsubmit = async (e) => {
    // prevent default
    e.preventDefault();

    // get form data

    const getFormData = new FormData(e.target);

    const formData = Object.fromEntries(getFormData.entries());

    // error handling

    try {
      await axios
        .put(`https://online1shop.herokuapp.com/api/v1/product/${formData.id}`, getFormData)

        .then((res) => {
          getAllProduct();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// Tag

/**
 * @desc get all  tag
 * @name GET api/v1/tag
 * @access public
 */

const getAllTag = async () => {
  // error handling

  try {
    await axios
      .get("https://online1shop.herokuapp.com/api/v1/tag")

      .then((res) => {
        let tagList = "";

        res?.data?.forEach((item, index) => {
          tagList += `

                <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.slug}</td>
                <td>
            <span class="badge  ${
              item?.status == "published" ? `bg-success` : `bg-danger`
            }">${item?.status}</span>

            </td>
            <td>
            <a edit_tag="${
              item?.id
            }" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_tag"><i class="fas fa-edit"></i></a>

            <a delete_tag="${
              item?.id
            }" class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
            </td>
            </tr>
            
                `;
        });

        if (tagDisplay) {
          tagDisplay.innerHTML = tagList;
        }

        // tag display

        const tagPublish = res.data.filter(
          (data) => data?.status == "published"
        );
        let shopTag = "";

        tagPublish?.forEach((tag) => {
          shopTag += ` <a href="/${tag.name}">${tag.name}</a> `;
        });

        if (TagDisplay) {
          TagDisplay.innerHTML = shopTag;
        }

        // tag form

        let shopFormTag = '<option value="">-SELECT-</option>';

        let publishTag = res?.data?.filter(item => item.status == "published")

        publishTag.forEach((tag) => {
          shopFormTag += ` 
                
                <option value="${tag.slug}">${tag.name}</option> 

                `;
        });

        if (TagForm) {
          TagForm.innerHTML = shopFormTag;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

getAllTag();

/**
 * @desc create a new tag
 * @name POST api/v1/tag
 * @access public
 */

if (tagForm) {
  tagForm.onsubmit = async (e) => {
    e.preventDefault();

    const tagForm = new FormData(e.target);

    const tagData = Object.fromEntries(tagForm.entries());

    // error handling

    try {
      await axios
        .post("https://online1shop.herokuapp.com/api/v1/tag", tagData)

        .then((res) => {
          getAllTag();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// edit delete update

if (tagDisplay) {
  tagDisplay.onclick = async (e) => {
    e.preventDefault();

    // get id

    const tagEdit = e.target.getAttribute("edit_tag");
    const tagDelete = e.target.getAttribute("delete_tag");

    // edit tag

    if (tagEdit) {
      try {
        await axios
          .get(`https://online1shop.herokuapp.com/api/v1/tag`)
          .then((res) => {
            const singleEdit = res?.data?.find((item) => item.id == tagEdit);

            let tagEditD = `
                    
                    <div class="my-3">
                        <label for="name">Tag Name</label>
                        <input required name="name" id="Name" value="${
                          singleEdit?.name
                        }" type="text" class="form-control" />
                        <input  name="id" value="${
                          singleEdit?.id
                        }" type="hidden"/>
                    </div>
                        <label for="status">Status</label>
                        <select required class="form-control" name="status" id="status">
                            < <option ${
                              singleEdit?.status == "published"
                                ? "selected"
                                : ""
                            } value="published">published</option>
                            <option ${
                              singleEdit?.status == "unPublished"
                                ? "selected"
                                : ""
                            }  value="unPublished">unPublished</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <input type="submit" class="btn btn-primary w-100" />
                    </div>
                    
                    `;

            if (updateTagForm) {
              updateTagForm.innerHTML = tagEditD;
            }
          })
          .catch((err) => {
            console.log(err.massage);
          });
      } catch (error) {
        console.log(error.massage);
      }
    }

    // delete tag

    if (tagDelete) {
      try {
        if (confirm("Are You Sure ? You Want To Delete This Tag !!")) {
          await axios
            .delete(`https://online1shop.herokuapp.com/api/v1/tag/${tagDelete}`)

            .then((res) => {
              getAllTag();
            })

            .catch((err) => {
              console.log(err.massage);
            });
        }
      } catch (error) {
        console.log(error.massage);
      }
    }
  };
}

// update Tag

if (updateTagForm) {
  updateTagForm.onsubmit = async (e) => {
    // prevent default
    e.preventDefault();

    // get form data

    const getFormTag = new FormData(e.target);

    const formData = Object.fromEntries(getFormTag.entries());

    // error handling

    try {
      await axios
        .put(`https://online1shop.herokuapp.com/api/v1/tag/${formData.id}`, formData)

        .then((res) => {
          getAllTag();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// category

/**
 * @desc get all  category
 * @name GET api/v1/tag
 * @access public
 */

const getAllCategory = async () => {
  // error handling

  try {
    await axios
      .get("https://online1shop.herokuapp.com/api/v1/category")

      .then((res) => {
        let catList = "";

        res?.data?.forEach((item, index) => {
          catList += `

                <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.slug}</td>
                <td>
                ${
                  item?.category_pic != ""
                    ? `<img class="pdImage" src="https://online1shop.herokuapp.com/category/${item?.category_pic}" alt="${item.name}"> `
                    : `<img class="card-img" src="//i.ibb.co/vzzJm1V/Tshirt.jpg" alt="">`
                }
                </td>
                <td>
            <span class="badge  ${
              item?.status == "published" ? `bg-success` : `bg-danger`
            }">${item?.status}</span>
            </td>
            <td>
            <a edit_category="${
              item?.id
            }" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_category"><i class="fas fa-edit"></i></a>

            <a delete_category="${
              item?.id
            }" class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
            </td>
            </tr>
            
                `;
        });

        if (categoryDisplay) {
          categoryDisplay.innerHTML = catList;
        }

        // Category display

        const categoryPublish = res.data.filter(
          (data) => data?.status == "published"
        );

        let shopCategory = "";

        categoryPublish?.forEach((category) => {
          shopCategory += `<li><a href="/${category.name}">${category.name}</a></li>`;
        });

        if (CategoryDisplay) {
          CategoryDisplay.innerHTML = shopCategory;
        }

        // category form

        let shopFormCategory = '<option value="">-SELECT-</option>';

        let publishCategory = res?.data?.filter(item => item.status == "published")

        publishCategory.forEach((category) => {
          shopFormCategory += ` 
                
                <option value="${category.slug}">${category.name}</option> 

                `;
        });

        if (categoryForm) {
          categoryForm.innerHTML = shopFormCategory;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

getAllCategory();

/**
 * @desc create a new category
 * @name POST api/v1/tag
 * @access public
 */

if (CategoryForm) {
  CategoryForm.onsubmit = async (e) => {
    e.preventDefault();

    const catForm = new FormData(e.target);

    // error handling

    try {
      await axios
        .post("https://online1shop.herokuapp.com/api/v1/category", catForm)

        .then((res) => {
          getAllCategory();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// edit delete update

if (categoryDisplay) {
  categoryDisplay.onclick = async (e) => {
    e.preventDefault();

    // get id

    const catEdit = e.target.getAttribute("edit_category");
    const catDelete = e.target.getAttribute("delete_category");

    // edit tag

    if (catEdit) {
      try {
        await axios
          .get(`https://online1shop.herokuapp.com/api/v1/category`)
          .then((res) => {
            const singEdit = res?.data?.find((item) => item.id == catEdit);

            let catEditD = `
                    
                    <div class="my-3">
                        <label for="name">Category Name</label>
                        <input required name="name" id="Name" value="${
                          singEdit?.name
                        }" type="text" class="form-control" />
                        <input  name="id" value="${
                          singEdit?.id
                        }" type="hidden"/>
                    </div>
                        <label for="status">Status</label>
                        <select required class="form-control" name="status" id="status">
                            < <option ${
                              singEdit?.status == "published" ? "selected" : ""
                            } value="published">published</option>
                            <option ${
                              singEdit?.status == "unPublished"
                                ? "selected"
                                : ""
                            }  value="unPublished">unPublished</option>
                        </select>
                    </div>
                    <div class="my-3">
                    <label for="Photo">Photo</label>
                    <input type="file" name="category_pic" class="form-control" />
                </div>
                    <div class="my-3">
                        <input type="submit" class="btn btn-primary w-100" />
                    </div>
                    
                    `;

            if (updateCatForm) {
              updateCatForm.innerHTML = catEditD;
            }
          })
          .catch((err) => {
            console.log(err.massage);
          });
      } catch (error) {
        console.log(error.massage);
      }
    }

    // delete tag

    if (catDelete) {
      try {
        if (confirm("Are You Sure ? You Want To Delete This Tag !!")) {
          await axios
            .delete(`https://online1shop.herokuapp.com/api/v1/category/${catDelete}`)

            .then((res) => {
              getAllCategory();
            })

            .catch((err) => {
              console.log(err.massage);
            });
        }
      } catch (error) {
        console.log(error.massage);
      }
    }
  };
}

// update category

if (updateCatForm) {
  updateCatForm.onsubmit = async (e) => {
    // prevent default
    e.preventDefault();

    // get form data

    const getFormCat = new FormData(e.target);

    const formCatData = Object.fromEntries(getFormCat.entries());

    // error handling

    try {
      await axios
        .put(
          `https://online1shop.herokuapp.com/api/v1/category/${formCatData.id}`,
          getFormCat
        )

        .then((res) => {
          getAllCategory();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// brand


/**
 * @desc get all  brand
 * @name GET api/v1/brand
 * @access public
 */

 const getAllBrand = async () => {
  // error handling

  try {
    await axios
      .get("https://online1shop.herokuapp.com/api/v1/brand")

      .then((res) => {
        let brandList = "";

        res?.data?.forEach((item, index) => {
          brandList += `

                <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.slug}</td>
                <td>
            <span class="badge  ${
              item?.status == "published" ? `bg-success` : `bg-danger`
            }">${item?.status}</span>

            </td>
            <td>
            <a edit_brand="${
              item?.id
            }" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_brand"><i class="fas fa-edit"></i></a>

            <a delete_brand="${
              item?.id
            }" class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
            </td>
            </tr>
            
                `;
        });

        if (brandDisplay) {
          brandDisplay.innerHTML = brandList;
        }

        // brand display

        const brandPublish = res.data.filter(
          (data) => data?.status == "published"
        );
        let brandTag = "";

        brandPublish?.forEach((brand) => {
          brandTag += ` <a href="/${brand.name}">${brand.name}</a> `;
        });

        if (BrandDisplay) {
          BrandDisplay.innerHTML = brandTag;
        }

        // brand form

        let shopFormBrand = '<option value="">-SELECT-</option>';

        let publishBrand = res?.data?.filter(item => item.status == "published")

        publishBrand.forEach((brand) => {
          shopFormBrand += ` 
                
                <option value="${brand.slug}">${brand.name}</option> 

                `;
        });

        if (BrandForm) {
          BrandForm.innerHTML = shopFormBrand;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

getAllBrand();

/**
 * @desc create a new brand
 * @name POST api/v1/brand
 * @access public
 */

if (brandForm) {
  brandForm.onsubmit = async (e) => {
    e.preventDefault();

    const branForm = new FormData(e.target);

    const branData = Object.fromEntries(branForm.entries());

    // error handling

    try {
      await axios
        .post("https://online1shop.herokuapp.com/api/v1/brand", branData)

        .then((res) => {
          getAllBrand();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// edit delete update

if (brandDisplay) {
  brandDisplay.onclick = async (e) => {
    e.preventDefault();

    // get id

    const brandEdit = e.target.getAttribute("edit_brand");
    const brandDelete = e.target.getAttribute("delete_brand");

    // edit brand

    if (brandEdit) {
      try {
        await axios
          .get(`https://online1shop.herokuapp.com/api/v1/brand`)
          .then((res) => {
            const singlesEdit = res?.data?.find((item) => item.id == brandEdit);

            let brandEditD = `
                    
                    <div class="my-3">
                        <label for="name">Brand Name</label>
                        <input required name="name" id="Name" value="${
                          singlesEdit?.name
                        }" type="text" class="form-control" />
                        <input  name="id" value="${
                          singlesEdit?.id
                        }" type="hidden"/>
                    </div>
                        <label for="status">Status</label>
                        <select required class="form-control" name="status" id="status">
                            < <option ${
                              singlesEdit?.status == "published"
                                ? "selected"
                                : ""
                            } value="published">published</option>
                            <option ${
                              singlesEdit?.status == "unPublished"
                                ? "selected"
                                : ""
                            }  value="unPublished">unPublished</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <input type="submit" class="btn btn-primary w-100" />
                    </div>
                    
                    `;

            if (updateBrandForm) {
              updateBrandForm.innerHTML = brandEditD;
            }
          })
          .catch((err) => {
            console.log(err.massage);
          });
      } catch (error) {
        console.log(error.massage);
      }
    }

    // delete brand

    if (brandDelete) {
      try {
        if (confirm("Are You Sure ? You Want To Delete This Tag !!")) {
          await axios
            .delete(`https://online1shop.herokuapp.com/api/v1/brand/${brandDelete}`)

            .then((res) => {
              getAllBrand();
            })

            .catch((err) => {
              console.log(err.massage);
            });
        }
      } catch (error) {
        console.log(error.massage);
      }
    }
  };
}

// update brand

if (updateBrandForm) {
  updateBrandForm.onsubmit = async (e) => {
    // prevent default
    e.preventDefault();

    // get form data

    const getFormBrand = new FormData(e.target);

    const formDataB = Object.fromEntries(getFormBrand.entries());

    // error handling

    try {
      await axios
        .put(`https://online1shop.herokuapp.com/api/v1/brand/${formDataB.id}`, formDataB)

        .then((res) => {
          getAllBrand();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
