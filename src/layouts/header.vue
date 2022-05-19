<script setup>

</script>
<template>
   <section 
      class="fixed bg-white bg-opacity-60 w-full  backdrop-blur-xl h-16  shadow-sm md:shadow-none items-center z-50 flex flex-row justify-between md:w-[15rem]   md:flex-col md:min-h-screen md:overflow-auto">
      <NavHeader />
    </section>

     <section class="mt-16 md:mt-0 md:ml-[15rem] bg-white_soft  min-h-full  backdrop-blur-3xl flex-1 w-full md:w-fit overflow-x-hidden md:min-h-screen">
      <RouterView/>
    </section>
</template>