<template>
	<div>
		<v-card class="card">

      <v-list>
        <template v-for="(item, index) in items1">
          <v-list-item
            v-if="item.action"
            :key="item.title"
            :to="item.href"

          >
            <v-list-item-action>
              <v-badge
        bordered
        inline
        color="error"
        :content="item.badge"
      >
      </v-badge>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-card class="card">

      <v-list>
        <template v-for="(item, index) in items2">
          <v-list-item
            v-if="item.action"
            :key="item.title"
            :to="item.href"

          >
            <v-list-item-action>
              <v-badge
        bordered
        inline
        color="error"
        :content="item.badge"
      >
      </v-badge>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-card class="card">

      <v-list>
        <template v-for="(item, index) in items3">
          <v-list-item
            v-if="item.action"
            :key="item.title"
            :to="item.href"

          >
            <v-list-item-action>
              <v-badge
        bordered
        inline
        color="error"
        :content="item.badge"
      >
      </v-badge>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-card class="card">

      <v-list>
        <template v-for="(item, index) in items4">
          <v-list-item
            v-if="item.action"
            :key="item.title"
            :to="item.href"

          >
            <v-list-item-action>
              <v-badge
        bordered
        inline
        color="error"
        :content="item.badge"
      >
      </v-badge>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </template>
      </v-list>
    </v-card>





    </div>
    
    
</template>

<script>
  export default {
    data: () => ({
      inset: true,
      items1: [
        {
          action: 'label',
          title: 'Контакты',
          badge: '3',
          href: '/contacts'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Организации',
          badge: '2',
          href: '/business'
        },
        {
          divider: false,
        },
      ],
      items2: [
        {
          action: 'label',
          title: 'Недвижимость',
          badge: '1',
          href: '/contacts'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Транспорт',
          badge: '2',
          href: '/business'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Имущество',
          badge: '2',
          href: '/business'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Товары / услуги',
          badge: '2',
          href: '/business'
        },
      ],
      items3: [
        {
          action: 'label',
          title: 'Бизнесы',
          badge: '1',
          href: '/contacts'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Сделки',
          badge: '2',
          href: '/business'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'События',
          badge: '2',
          href: '/business'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Статистика',
          badge: '0',
          href: '/business'
        },
      ],
      items4: [
        {
          action: 'label',
          title: 'Группы',
          badge: '1',
          href: '/contacts'
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'Участники',
          badge: '2',
          href: '/business'
        },
      ],
    }),
  }
</script>