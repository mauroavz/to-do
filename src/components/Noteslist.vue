<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Buscar por titulo"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle"> Buscar </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tareas</v-card-title>

        <v-data-table
          :headers="headers"
          :items="notes"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editNote(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteNote(item.id, item.status)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="notes.length > 0">
          <v-btn small color="error" @click="removeAllNotes">
            Eliminar todo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import NoteDataService from "../services/NoteDataService";
export default {
  name: "notes-list",
  data() {
    return {
      notes: [],
      title: "",
      headers: [
        { text: "Titulo", align: "start", sortable: false, value: "title" },
        { text: "Descripcion", value: "description", sortable: false },
        { text: "Estado", value: "status", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveNotes() {
      NoteDataService.getAll()
        .then((response) => {
          this.notes = response.data.map(this.getDisplayNote);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveNotes();
    },

    async removeAllNotes() {
       let res = await this.$confirm('¿Esta seguro de eliminar todas las tareas?', { title: 'Confirmar' })
      if (res) {
      NoteDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        }
    },

    searchTitle() {
      NoteDataService.findByTitle(this.title)
        .then((response) => {
          this.notes = response.data.map(this.getDisplayNote);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

   editNote(id) {
      this.$router.push({ name: "note-details", params: { id: id } });
    },

    async deleteNote(id, status) {
      if(status == "Pendiente"){
      let res = await this.$confirm('¿Esta seguro de eliminar una tarea pendiente?', { title: 'Confirmar' })
      if (res) {
       NoteDataService.delete(id)
          .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        })
      }
      }else{
          NoteDataService.delete(id)
          .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        })
      }
    },

    getDisplayNote(note) {
      return {
        id: note.id,
        title: note.title.length > 30 ? note.title.substr(0, 30) + "..." : note.title,
        description: note.description,
        status: note.published ? "Finalizado" : "Pendiente",
      };
    },
  },
  mounted() {
    this.retrieveNotes();
  },
};
</script>

<style>
.list {
  max-width: 1500px;
  background: #E7E7E7;
}
</style>