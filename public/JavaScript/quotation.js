document.addEventListener('DOMContentLoaded', function () {
    const orderId = '123456'; // This should be dynamically set

    // Function to fetch and display products
    function fetchAndDisplayProducts() {
        fetch(`/order/${orderId}/products`)
            .then(response => response.json())
            .then(products => {
                const productRows = products.map((product, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.width}</td>
                        <td>${product.height}</td>
                        <td>${product.number}</td>
                        <td>$${product.price}</td>
                        <td>$${product.number * product.price}</td>
                    </tr>
                `).join('');

                document.querySelector('.bill-table tbody').innerHTML = `
                    ${productRows}
                    <tr>
                        <td colspan="6" class="text-right">Shipping Fee</td>
                        <td>$${calculateShippingFee()}</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-right">VAT</td>
                        <td>$${calculateVAT()}</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-right">Total</td>
                        <td>$${calculateTotal(products)}</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-right">Paid</td>
                        <td>$${calculatePaid()}</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-right">Check</td>
                        <td>$${calculateCheck()}</td>
                    </tr>
                `;
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Function to add a new product
    document.getElementById('addProductButton').addEventListener('click', function () {
        const newProduct = {
            productName: document.getElementById('productName').value,
            width: document.getElementById('productWidth').value,
            height: document.getElementById('productHeight').value,
            number: document.getElementById('productNumber').value,
            price: document.getElementById('productPrice').value,
        };

        fetch(`/order/${orderId}/add-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchAndDisplayProducts(); // Refresh product list
            })
            .catch(error => console.error('Error adding product:', error));
    });

    // Initial fetch and display of products
    fetchAndDisplayProducts();
    
    // Additional functions to calculate fees and totals
    function calculateShippingFee() {
        // Your logic here
        return 10; // Example static value
    }

    function calculateVAT() {
        // Your logic here
        return 20; // Example static value
    }

    function calculateTotal(products) {
        let total = products.reduce((sum, product) => sum + product.number * product.price, 0);
        return total + calculateShippingFee() + calculateVAT(); // Adjust as needed
    }

    function calculatePaid() {
        // Your logic here
        return 200; // Example static value
    }

    function calculateCheck() {
        const total = calculateTotal(products);
        const paid = calculatePaid();
        return total - paid; // Adjust as needed
    }
});
