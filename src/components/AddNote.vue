<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Agregar Tarea</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="note.title"
          :rules="[(v) => !!v || 'Titulo es requerido']"
          label="Titulo"
          required
        ></v-text-field>

        <v-text-field
          v-model="note.description"
          :rules="[(v) => !!v || 'La descripcion es requerida']"
          label="Descripcion"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveNote">Subir</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          ¡Enviado satisfactoriamente!
        </v-card-title>

        <v-card-subtitle>
          Haga clic en el botón para agregar una nueva tarea
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newNote">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import NoteDataService from "../services/NoteDataService";

export default {
  name: "add-note",
  data() {
    return {
      note: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveNote() {
      var data = {
        title: this.note.title,
        description: this.note.description,
      };

      NoteDataService.create(data)
        .then((response) => {
          this.note.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newNote() {
      this.submitted = false;
      this.note = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 350px;
  padding: 60px;
  background-color: #E7E7E7;
  margin: 0 auto;
}
</style>