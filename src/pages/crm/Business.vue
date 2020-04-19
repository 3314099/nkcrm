<template>
<div class="columns">
  <div class="column column1">
    <v-card class="card">
      <v-btn-toggle v-model="toggle_exclusive">
          <v-btn>
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>


          <v-btn>
            <v-icon>mdi-format-size</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-eye-off</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </v-btn-toggle>
    </v-card>
    <v-card class="card">
      <div class="margin d-flex">
        <v-btn
          class="white--text btn v-button"
          color="error"
          rounded
          to="/contacts"

        >
        <v-badge
        bordered
        inline
        color="error"
        content="3"
      >
      Контакты
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin d-flex">
        <v-btn
          class="white--text btn"
          color="error"
          rounded
          depressed
        >
          Организации
        <v-badge
        bordered
        inline
        color="error"
        content="2"
        overlap
      >
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    </v-card>
    <v-card class="card">
      <div class="margin">
        <v-btn
          class="white--text btn v-button"
          color="error"
          rounded
          to="/contacts"

        >
        <v-badge
        bordered
        inline
        color="error"
        content="3"
      >
      Недвижимость
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn"
          color="error"
          rounded
          depressed
        >
          Транспорт
        <v-badge
        bordered
        inline
        color="error"
        content="2"
        overlap
      >
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn"
          color="error"
          rounded
          depressed
        >
          Имущество
        <v-badge
        bordered
        inline
        color="error"
        content="2"
        overlap
      >
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn"
          color="error"
          rounded
          depressed
        >
          Товары/услуги
        <v-badge
        bordered
        inline
        color="error"
        content="2"
        overlap
      >
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    </v-card>
    <v-card class="card">
      <div class="margin">
        <v-btn
          class="white--text btn v-button"
          color="error"
          rounded
          to="/contacts"

        >
        <v-badge
        bordered
        inline
        color="error"
        content="3"
      >
      Бизнесы
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn v-button"
          color="error"
          rounded
          to="/contacts"

        >
        <v-badge
        bordered
        inline
        color="error"
        content="3"
      >
      Сделки
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn"
          color="error"
          rounded
          depressed
        >
          События
        <v-badge
        bordered
        inline
        color="error"
        content="2"
        overlap
      >
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn"
          color="error"
          rounded
          depressed
        >
          Статистика
        <v-badge
        bordered
        inline
        color="error"
        content="2"
        overlap
      >
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    </v-card>
    <v-card class="card">
      <div class="margin">
        <v-btn
          class="white--text btn v-button"
          color="error"
          rounded
          to="/contacts"

        >
        <v-badge
        bordered
        inline
        color="error"
        content="3"
      >
      Группы
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    <div class="margin">
        <v-btn
          class="white--text btn v-button"
          color="error"
          rounded
          to="/contacts"

        >
        <v-badge
        bordered
        inline
        color="error"
        content="3"
      >
      Участники
      </v-badge>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </div>
    
    
    </v-card>
  </div>










  <div class="column column2">
    <article class="card">
      Hello World
    </article>
    <article class="card">
      Hello World
    </article>
  </div>
  <div class="column column3">
    <article class="card">
      Hello World
    </article>
    <article class="card">
      Hello World<br>
      Foo Bar
    </article>
    <article class="card">
      Hello World
    </article>
  </div>
  
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
html {
  font-family: sans-serif;
}

.columns {
  display: flex;
}

.column {
  /* background: #eee; */
  /* border: 1px solid #ccc; */
  margin: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1px;
}
.btn {
  width: 190px;
}
.column1 {
  max-width: 285px;
  min-width: 200px;
}

.column2 {
  flex: 2;
}

.column3 {
   max-width: 300px;
   min-width: 300px;
}

.card {
  background: mediumseagreen;
  border: 1px solid seagreen;
  color: white;
  flex: 1;
  margin: 4px 2px;
  padding: 5px;
}

.margin{
  margin: 10px;
}
.v-button {
  text-align: left;
}

</style>
