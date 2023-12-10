// Configuración de la web app de Firebase
const firebaseConfig = {
	apiKey: "AIzaSyB68gPKSFmxRlPhVlvQQIlKCfg_OShvPm4",
    authDomain: "deustoagenda.firebaseapp.com",
    projectId: "deustoagenda",
    storageBucket: "deustoagenda.appspot.com",
    messagingSenderId: "722217663874",
    appId: "1:722217663874:web:55ad746bf327345177e39b"
};

// Importar función para inicializar la app de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js'

// Importar las funciones de Firestore necesarias
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, getDoc} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js'

// Initializar app de Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = new Vue({
	el: '#app',
	data: {
		titulo: 'DeustoAgenda',
		agenda: [],
		contacto: {nombre: '', email: '', telf: ''},
	},

	created: function () {
		// Cargar la agenda cuando se inicie la app
		this.cargarAgenda();
	},
	
	methods: {
		// Cargar datos de la colección en Firestore
		cargarAgenda: async function () {
			const agendaRef = collection(db, 'DeustoAgenda');
			const snapshot = await getDocs(agendaRef);
			snapshot.forEach(doc => {
  				this.contacto = doc.data();
				this.agenda.push(this.contacto);
				this.contacto = {nombre: '', email: '', telf: ''};
			});
		},

		// Crear nuevo contacto
		crearContacto: async function () {
			//	Comprobar que los campos no estan vacios
			if (this.contacto.nombre === '' || this.contacto.email === '' || this.contacto.telf === '') {
				alert('Debe rellenar todos los campos.');
			} else {
				// Obtener documento con id igual al email
				const docRef = doc(db, "DeustoAgenda", this.contacto.email);
				const docSnap = await getDoc(docRef);
				// Comprobar que no exista un contacto con ese email
				if (!docSnap.exists()) {
					this.agenda.push(this.contacto);
					try {
						// Crear documento en Firestore para el contacto con ID igual al email
						const docRef = await setDoc(doc(db, "DeustoAgenda", this.contacto.email), {
							nombre: this.contacto.nombre,
							email: this.contacto.email,
							telf: this.contacto.telf
						});
						console.log("Document written with ID: ", docRef.id);
					} catch (e) {
						console.error("Error adding document: ", e);
					}
					this.contacto = {nombre: '', email: '', telf: ''};
				} else {
					alert('Ya existe un contacto con ese correo electrónico.');
				}
			}
		},
		
		// Borrar contacto
		eliminarContacto: function (index) {
			if(confirm("Se va a eliminar el contacto de " + this.agenda[index].nombre + ". ¿Está seguro?")) {
				deleteDoc(doc(db, "DeustoAgenda", this.agenda[index].email)) // Eliminar de Firestore
				this.agenda.splice(index, 1); // Borrar del array
			}
		},

	},
});
