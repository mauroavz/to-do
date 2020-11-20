<template>
  <v-app style="background-image: url('https://i.ibb.co/LvxgwLT/web-design-2906159.jpg')">
    <v-app-bar app dark>
      <div class="align-center mr-4">
        <img style="width: 150px" src="https://i.ibb.co/P93qwcW/ico-1.png">
      </div>

      <v-btn to="/notes" text>
        Mis Tareas
      </v-btn>

      <v-btn to="/add" text>
        Agregar tarea
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
