document.addEventListener('DOMContentLoaded', function() {
    const namaInput = document.getElementById('nama');
    const deskripsiInput = document.getElementById('deskripsi');
    const deadlineInput = document.getElementById('deadline');
    const tambahTugasButton = document.getElementById('tambahTugas');
    const daftarTugas = document.getElementById('daftarTugas');

    let tugasList = []; // Array untuk menyimpan tugas
    let updateIndex = -1; // Indeks tugas yang akan diupdate

    function renderTugas() {
        daftarTugas.innerHTML = ''; // Bersihkan daftar tugas

        tugasList.forEach((tugas, index) => {
            const tugasSection = document.createElement('section');
            tugasSection.classList.add('tugasItem');

            tugasSection.innerHTML = `
                <div class="belajar">
                    <label>Nama Tugas:</label>
                    <span>${tugas.nama}</span>
                </div>
                <div class="deskripsi">
                    <label>Deskripsi Tugas:</label>
                    <span>${tugas.deskripsi}</span>
                </div>
                <div class="deadline">
                    <label>Deadline Tugas:</label>
                    <span>${tugas.deadline}</span>
                </div>
                <div class="button-delete">
                    <button class="hapusTugas" data-index="${index}">Hapus Tugas</button>
                </div>
                <div class="button-update">
                    <button class="updateTugas" data-index="${index}">Update Tugas</button>
                </div>
            `;

            daftarTugas.appendChild(tugasSection);
        });

        // Tambahkan event listener untuk tombol hapus dan update
        document.querySelectorAll('.hapusTugas').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                hapusTugas(index);
            });
        });

        document.querySelectorAll('.updateTugas').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                updateTugas(index);
            });
        });
    }

    function tambahTugas() {
        const nama = namaInput.value;
        const deskripsi = deskripsiInput.value;
        const deadline = deadlineInput.value;

        if (nama && deskripsi && deadline) {
            if (updateIndex === -1) {
                // Tambah tugas baru
                tugasList.push({ nama, deskripsi, deadline });
            } else {
                // Update tugas yang ada
                tugasList[updateIndex].nama = nama;
                tugasList[updateIndex].deskripsi = deskripsi;
                tugasList[updateIndex].deadline = deadline;
                updateIndex = -1; // Reset updateIndex
                tambahTugasButton.textContent = "Tambah Tugas";
                // Reset onclick ke fungsi tambahTugas yang asli
                tambahTugasButton.onclick = function() {
                    tambahTugas(); // Panggil fungsi tambahTugas yang asli
                };
            }
            renderTugas();
            namaInput.value = '';
            deskripsiInput.value = '';
            deadlineInput.value = '';
        } else {
            alert('Mohon isi semua field.');
        }
    }

    function hapusTugas(index) {
        tugasList.splice(index, 1);
        renderTugas();
    }

    function updateTugas(index) {
        const tugas = tugasList[index];
        namaInput.value = tugas.nama;
        deskripsiInput.value = tugas.deskripsi;
        deadlineInput.value = tugas.deadline;

        updateIndex = index; // Set index tugas yang akan diupdate
        tambahTugasButton.textContent = "Simpan Perubahan";
        tambahTugasButton.onclick = tambahTugas;
    }

    tambahTugasButton.addEventListener('click', tambahTugas);
});