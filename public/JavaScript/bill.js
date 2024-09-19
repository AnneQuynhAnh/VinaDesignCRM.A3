document.addEventListener('DOMContentLoaded', function () {
    // Example data to populate the bill (You would replace this with actual data from your database)
    const billData = {
        orderNumber: '123456',
        customerName: 'John Doe',
        phone: '0987654321',
        createdDate: '2024-08-21',
        businessPerson: 'Jane Smith',
        designer: 'Alex Brown',
        products: [
            { name: 'Product A', width: '10cm', height: '15cm', number: 100, price: 5 },
            { name: 'Product B', width: '20cm', height: '25cm', number: 50, price: 10 }
        ],
        shippingFee: 10,
        vat: 20,
        total: 530,
        paid: 200,
        check: 330
    };

    // Populate the bill information
    document.querySelector('.bill-info .column:nth-child(1) p:nth-child(1)').textContent += billData.orderNumber;
    document.querySelector('.bill-info .column:nth-child(1) p:nth-child(2)').textContent += billData.customerName;
    document.querySelector('.bill-info .column:nth-child(1) p:nth-child(3)').textContent += billData.phone;
    document.querySelector('.bill-info .column:nth-child(2) p:nth-child(1)').textContent += billData.createdDate;
    document.querySelector('.bill-info .column:nth-child(2) p:nth-child(2)').textContent += billData.businessPerson;
    document.querySelector('.bill-info .column:nth-child(2) p:nth-child(3)').textContent += billData.designer;

    // Populate the products table
    const productRows = billData.products.map((product, index) => `
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
            <td>$${billData.shippingFee}</td>
        </tr>
        <tr>
            <td colspan="6" class="text-right">VAT</td>
            <td>$${billData.vat}</td>
        </tr>
        <tr>
            <td colspan="6" class="text-right">Total</td>
            <td>$${billData.total}</td>
        </tr>
        <tr>
            <td colspan="6" class="text-right">Paid</td>
            <td>$${billData.paid}</td>
        </tr>
        <tr>
            <td colspan="6" class="text-right">Check</td>
            <td>$${billData.check}</td>
        </tr>
    `;

    // Event listeners for footer buttons
    document.getElementById('DangThucHienButton').addEventListener('click', function () {
        alert('Order status: Đang Thực Hiện');
    });

    document.getElementById('HoanTatButton').addEventListener('click', function () {
        alert('Order status: Hoàn Tất');
    });

    document.getElementById('BiHuyButton').addEventListener('click', function () {
        alert('Order status: Bi Huỷ');
    });
});
