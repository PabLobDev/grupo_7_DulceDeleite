       window.addEventListener('load', () => {
          let forms = document.querySelectorAll('#eliminar-producto');
          for (let i = 0; i < forms.length; i++) {
            forms[i].addEventListener('submit', event => {
              event.preventDefault();
              Swal.fire({
                customClass: {
                  confirmButton: 'swalBtnColor',
                  cancelButton: 'swalBtnColor'
                },

                title: '¿Estas seguro que quieres eliminar el producto?',
                text: "Esta accion es irreversible!",
                icon: 'warning',
                background: "#ffe4ec",
                showCancelButton: true,
                confirmButtonColor: '#f5deb3',
                cancelButtonColor: '#f5deb3',
                confirmButtonText: 'Eliminar',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },

              }).then((result) => {
                if (result.isConfirmed) {



                  forms[i].submit();
                }

              })

            })

          }
        })
