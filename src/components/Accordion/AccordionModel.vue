<template>
    <div class="wrapper">
        <button @click="switchIsOpen" class="header-wrapper">
            <SubTitle text="Banco de imagens" />
            <i class="fa-solid fa-sort-down icon-wrapper " :class="{ isOpen : isOpen }" ></i>
        </button>
        <div class="body-wrapper" :class="{ isOpen : isOpen }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import SubTitle from "../Titles/SubTitle.vue";

export default defineComponent({
    name: "AccordionModel",
    components: {SubTitle},
    data(){
        return{
            isOpen: true
        }
    },
    methods: {
        switchIsOpen(){
            this.isOpen = !this.isOpen;
        }
    }
});
</script>

<style scoped>
.wrapper{
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #213140;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.header-wrapper{
    width: 100%;
    display: flex;
    background: none;
    border: none;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.icon-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16pt;
    color: #213140;
    transform: rotate(0deg);
    transition: transform 0.2s ease-in;
}

.icon-wrapper.isOpen{
    transform: rotate(180deg);
}

.body-wrapper{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: .7em;
    transition: max-height 0.2s ease-in-out;
    max-height: 0; /* 1000px */
}

.body-wrapper.isOpen{
    max-height: 1000px;
}
</style>