<template>
  <div class="profile-card">
     <div class="profile-card-header">
       <div class="profile-card-header-info">
          <img class="profile-avatar" :src="getProfileAvatar" alt="profile avatar" />
          <div class="profile-meta">
            <div class="profile-name">{{profile.name.first}} {{profile.name.last}}</div>
            <div class="profile-title">{{profile.title}}</div>
          </div>
          <profile-card-tools
            @handle-remove="onProfileRemove" :route="profile.id" :show-collapse="showCollapse"
            @handle-collapse="onToggleCollaps" />
       </div>
      <b-collapse class="profile-meta-info" :id="`profile-${profile.id}`" v-model="showCollapse" role="tabpanel">
        <item-row offset="100" title="Email:">{{profile.email}}</item-row>
        <item-row offset="100" title="Phone:">{{profile.phone}}</item-row>
        <item-row offset="100" title="Location:">{{getLocation}}</item-row>
      </b-collapse>
    </div>
    <div class="profile-card-body" v-if="profile.tasks.length">
      Tasks:
      <profile-task v-for="task in profile.tasks" :key="task.id" :route="task.id" :name="task.name" :type="task.type" :status="task.status" />
    </div>

     <div class="profile-card-footer" v-if="profile.roles.length">
      <div class="profile-skills">Roles:</div>
      <ul class="profile-skills-list">
        <li v-for="role in profile.roles" :style="{borderColor: role.color}" :key="role.key">{{role.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import itemRow from '@/components/common/item-row'
import profileCardTools from '@/components/profile/profile-card-tools/profile-card-tools'
import typeMark from '@/components/common/type-mark'
import profileTask from '@/components/profile/profile-task/profile-task'

import profileModel, { getLocation } from '@/components/profile/profile-model'
import defaultAvatar from '@/assets/default-avatar.png'

export default {
  name: 'profile-card',

  components: { itemRow, profileCardTools, typeMark, profileTask },

  props: {
    profile: {
      type: Object,
      default: profileModel
    },
    'handle-remove': {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      showCollapse: false
    }
  },

  methods: {
    onProfileRemove (id) {
      this.$emit('handle-remove', id)
    },

    onToggleCollaps () {
      this.showCollapse = !this.showCollapse
    }
  },

  computed: {
    getLocation () {
      return getLocation(this.profile.location)
    },

    getProfileAvatar () {
      return this.profile.picture.large || defaultAvatar
    }
  }
}
</script>

<style lang="scss">
// https://vue-loader.vuejs.org/en/configurations/pre-processors.html
.profile-card {
  position: relative;
  border-radius: 4px;
  margin-bottom: 25px;

  &:hover {
    .profile-card-tools {
      display: inline-flex;
    }
  }

  &-header {
    padding: 20px 25px;
    background-color: $black-1;
    border-bottom: 2px solid $green-3;

    &-info {
      display: flex;
      align-items: center;
    }
  }

  &-body {
    padding: 20px 25px;
    background-color: $black-2;
  }

  &-footer {
    display: flex;
    align-items: center;
    padding: 20px 25px;
    background-color: $black-1;
    border-top: 2px solid #394d65;
  }

  .profile-card-tools {
    display: none;
  }

  .profile-meta-info {
    margin-top: 10px;
  }

  .profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .profile-title {
    color: $gray-5;
  }

  .profile-skills {
    margin-right: 15px;

    &-list {
      margin-top: -10px;

      > li {
        margin-right: 8px;
        margin-top: 10px;
        padding: 4px 12px;
        display: inline-block;
        border: 1px solid $gray-5;
        border-radius: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>


