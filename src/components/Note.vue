<template>
  <div v-if="currentNote" class="edit-form py-3">
    <p class="headline">Editar Tarea</p>
    
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentNote.title"
        :rules="[(v) => !!v || 'Titulo es requerido']"
        label="Titulo"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentNote.description"
        :rules="[(v) => !!v || 'Descripcion es requerida']"
        label="Descripcion"
        required
      ></v-text-field>

      <label><strong>Estado:</strong></label>
      {{ currentNote.published ? "Finalizado" : "Pendiente" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentNote.published"
        @click="updatePublished(false)"
        color="primary" small class="mr-2"
      >
        Volver a Pendiente
      </v-btn>

      <v-btn v-else
        @click="updatePublished(true)"
        color="primary" small class="mr-2"
      >
        Finalizar Tarea
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteNote">
        Eliminar
      </v-btn>

      <v-btn color="success" small @click="updateNote">
        Subir
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Haga clic en una nota ...</p>
  </div>
</template>

<script>
import NoteDataService from "../services/NoteDataService";

export default {
  name: "note",
  data() {
    return {
      currentNote: null,
      message: "",
    };
  },
  methods: {
    getNote(id) {
      NoteDataService.get(id)
        .then((response) => {
          this.currentNote = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentNote.id,
        title: this.currentNote.title,
        description: this.currentNote.description,
        published: status,
      };

      NoteDataService.update(this.currentNote.id, data)
        .then((response) => {
          this.currentNote.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateNote() {
      NoteDataService.update(this.currentNote.id, this.currentNote)
        .then((response) => {
          console.log(response.data);
          this.message = "¡La tarea se actualizó correctamente!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

   async deleteNote() {
    if(this.currentNote.published == 0){
      let res = await this.$confirm('¿Esta seguro de eliminar una tarea pendiente?', { title: 'Confirmar' })
      if (res){
       NoteDataService.delete(this.currentNote.id)
           .then((response) => {
           console.log(response.data);
           this.$router.push({ name: "notes" });
        })
        .catch((e) => {
          console.log(e);
        });
        }
        }else{
         NoteDataService.delete(this.currentNote.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "notes" });
        })
        .catch((e) => {
          console.log(e);
        });
      }
   },


  },

  mounted() {
    this.message = "";
    this.getNote(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 350px;
  padding: 60px;
  background-color: #E7E7E7;
  margin: 0 auto;
}
</style>