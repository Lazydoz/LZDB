// Thêm biến này để xác định đang sửa hay thêm mới
      let editingId = null; 

      // day du lieu cua base len dong
      function loadbase(){

        fetch('/api/base')
        .then(res => res.json())
        .then(base => {

          const appear = document.querySelector('#base-table tbody');

          appear.innerHTML = ``;

          base.forEach(b => {

            appear.innerHTML += `
              <tr>

                <td>${b.base_id}</td>

                <td>${b.booth_id}</td>

                <td>${b.base_name}</td>

                <td><img src="${b.image}" alt="${b.base_name}" style="width: 3rem; height: 3rem; object-fit: cover;"></td>

                <td style="max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${b.source ? `<a href="${b.source}" target="_blank" title="${b.source}">Link</a>` : ''}
                </td>

                <td style="max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${b.source ? `<a href="${b.source}" target="_blank" title="${b.source}">Link</a>` : ''}
                </td>

                <td>
                  <button class="btn btn-warning btn-sm" onclick="editBase('${b.base_id}')">Sửa</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteBase('${b.base_id}')">Xóa</button>
                </td>

              </tr>
            `;
          });

        })

      }
      loadbase();

      // HAM DAT LAI 
      function resetForm() {
        document.getElementById('product-form').reset();
        document.getElementById('submit-btn').textContent = 'Thêm mới';
        editingId = null; 
      }

      // HAM EDIT
      function editBase(base_id) {
        fetch('/api/base/' + base_id)
        .then(res => res.json())
        .then(b => {
          document.getElementById('base_id').value = b.base_id;
          document.getElementById('booth_id').value = b.booth_id;
          document.getElementById('name').value = b.base_name;
          document.getElementById('image').value = b.image;
          document.getElementById('source').value = b.source || '';
          document.getElementById('download').value = b.download || '';
          document.getElementById('submit-btn').textContent = 'Cập nhật';
          editingId = base_id; 
        })
      }

      // HAM XOA
      function deleteBase(base_id) {
        if (confirm(' XOA SAN PHAM NAY')) {
          fetch('/api/base/' + base_id ,{method: 'DELETE'})
          .then(res =>  res.json())
          .then(() => loadbase())
        }
      }

      document.getElementById('product-form').onsubmit = (e) => {
      e.preventDefault();
      const id = editingId; // Lấy ID nếu đang sửa
      const data = {
        base_id: document.getElementById('base_id').value,
        booth_id: document.getElementById('booth_id').value,
        base_name: document.getElementById('base_name').value,
        image: document.getElementById('image').value,
        source: document.getElementById('source').value,
        download: document.getElementById('download').value
      };

      if (id) {
        // Sửa sản phẩm
        fetch('/api/base/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => {
          resetForm();
          loadbase();
        });
      }

      else {
        // Thêm sản phẩm
        fetch('/api/base', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => {
          resetForm();
          loadbase();
        });
      }
    };