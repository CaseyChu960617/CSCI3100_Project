<template>
  <v-container fluid class="pa-0">
    <div>
    <button v-on:click="send">Send</button>
    </div>
     <div>
    <button v-on:click="recieve">Reiceve</button>
    </div>
  </v-container>
</template>

<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
        socket:io("http://localhost:9000",{ transports: ['websocket', 'polling', 'flashsocket'] })
     // isConnected: false,
     // socketMessage: ''
    }
  },


  methods: {
    
    send() {
        console.log(this.$socket)
        alert("fuck")
        this.$socket.emit('send',{
          user:"Kenny",
          message:"Hello World"
     })
    },
    recieve() {
     this.$socket.on('recieve',(data)=>{
         console.log(data.message)
     })
     
    }
  },
 
  
  
  }

</script>