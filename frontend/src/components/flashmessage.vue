<template>
    <FlashMessage :position="'right bottom'"/>
  </template>
  
  <script>
  export default {
    // ... some your code
    methods: {
      someEventHandler() {
        /*
        * You shouldn't set up strategy every time
        * before "show" method call. It is just an
        * example.
        */
        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
          title: 'Title for success message',
          message: 'Lorem ipsum...'
        });
      }
    }