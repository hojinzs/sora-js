<script setup lang="ts">
import { ref } from 'vue'
import useSoraJS_Client from "../compositions/sora.js-client";

const message = ref<string>("")
const room = ref<string>("")
const chatMessages = ref<any[]>([])

const { emitMessage, onMessage, joinRoom } = useSoraJS_Client()

const onSendMessage = () => {
    if(message.value !== ""){
        console.log("send message => ", message.value)
        emitMessage(room.value, message.value)
        message.value = ""
    }
}

onMessage(message => {
    chatMessages.value.push(message)
})

const onJoinRoom = () => {
    if(room.value !== ""){
        console.log("join room => ", room.value)
        joinRoom(room.value)
    }
}

</script>

<template>
    <div>
        <h3>ROOM : {{ room || 'Public' }}</h3>
        <form @submit.prevent="onJoinRoom">
            <input name="message" v-model="room"/>
            <input type="submit" value="룸 변경"/>
        </form>
        <form @submit.prevent="onSendMessage">
            <input name="message" v-model="message"/>
            <input type="submit" value="보내기"/>
        </form>
        <div>
            <div v-for="(msg, index) in chatMessages" :key="index">{{ msg }}</div>
        </div>
    </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
