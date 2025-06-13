function createCrudTable(config) {
    const {
        apiEndpoint,
        mainId,
        fields,
        tableSelector,
        formSelector,
        submitBtnId
    } = config;

    let editingId = null;

    function loadData() {
        fetch(apiEndpoint)
        .then(res => res.json())
        .then(items => {
            const appear = document.querySelector(`${tableSelector} tbody`);
            appear.innerHTML = "";

            let rows = items.map(i => {
                let row = `<tr>`;
                row += fields.map(field => {
                    if (field === 'image') {
                        return `<td><img src="${i[field]}" style="width:3rem;height:3rem;object-fit:cover"></td>`;
                    }
                    if (field === 'source' || field === 'download') {
                        if (i[field]) {
                            return `<td><a href="${i[field]}" target="_blank" title="${i[field]}">Link</a></td>`;
                        } else {
                            return `<td></td>`;
                        }
                    }
                    return `<td>${i[field] || ''}</td>`;
                }).join('');
                row += `<td>
                            <button class="btn btn-warning btn-sm" onclick="editItem('${i[mainId]}')">Sửa</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteItem('${i[mainId]}')">Xóa</button>
                        </td>`;
                row += `</tr>`;
                return row;
            }).join('');

            appear.innerHTML = rows;
        });
    }

    // chinh sua du lieu
    window.editItem =  (id) => {
        fetch(`${apiEndpoint}/${id}`)
        .then(res => res.json())
        .then(item => {
            fields.forEach(f => {
                const el = document.getElementById(f);
                if (el) {
                    el.value = item[f] || '';
                }
            })

            document.getElementById(submitBtnId).textContent = 'Cập nhật';
            editingId = id;
        })
    }

    // xoa du lieu
    window.deleteItem = function(id) {
        if (confirm('Xóa bản ghi này?')) {
            fetch(`${apiEndpoint}/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => loadData());
        }
    };

    // reset form
    function resetForm() {
        document.querySelector(formSelector).reset();
        document.getElementById(submitBtnId).textContent = 'Thêm mới';
        editingId = null;
    }
    window.resetForm = resetForm;

    //
    document.querySelector(formSelector).onsubmit = (e) => {
        e.preventDefault();
        const data = {};
        fields.forEach(f => {
            const el = document.getElementById(f);
            data[f] = el ? el.value : '';
        });
        if (editingId) {
            fetch(`${apiEndpoint}/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(() => {
                resetForm();
                loadData();
            });
        } else {
            fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(() => {
                resetForm();
                loadData();
            });
        }
    };

    // laod du lieu ban dau
    loadData();
}