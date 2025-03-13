<template>
    <UCard class="bg-gray-200 mx-8 my-8">
        <template #header>
            <div class="flex justify-between">
                <div class="flex flex-wrap content-center">
                    <h1>
                        Théo Pruvot
                    </h1>
                </div>
                <div class="flex flex-wrap content-center">
                    <h1>
                        Padlock cracker
                    </h1>
                </div>
                <div>
                    <UIcon name="i-heroicons-lock-closed-solid" class="w-10 h-10" />
                </div>
            </div>
        </template>

        <div class="mx-8 my-8">
            <div v-if="step >= 1" class="my-8">
                <h2 class="flex justify-center">Devine le code</h2>
                <div class="flex justify-center">
                    <USelect :model-value="firstModel[0]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => firstModel[0] = Number(num)" />
                    <USelect :model-value="firstModel[1]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => firstModel[1] = Number(num)" />
                    <USelect :model-value="firstModel[2]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => firstModel[2] = Number(num)" />
                    <USelect :model-value="firstModel[3]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => firstModel[3] = Number(num)" />
                </div>

                <div class="flex justify-center">
                    <UButton :label="firstHint[0]" :color="firstHint[0]" size="xl" class="mx-2 my-2" />
                    <UButton :label="firstHint[1]" :color="firstHint[1]" size="xl" class="mx-2 my-2" />
                    <UButton :label="firstHint[2]" :color="firstHint[2]" size="xl" class="mx-2 my-2" />
                    <UButton :label="firstHint[3]" :color="firstHint[3]" size="xl" class="mx-2 my-2" />
                </div>
            </div>

            <div v-if="step >= 2" class="my-8">
                <h2 class="flex justify-center">Devine le code essai 2/3</h2>
                <div class="flex justify-center">
                    <USelect :model-value="secondModel[0]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => secondModel[0] = Number(num)" />
                    <USelect :model-value="secondModel[1]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => secondModel[1] = Number(num)" />
                    <USelect :model-value="secondModel[2]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => secondModel[2] = Number(num)" />
                    <USelect :model-value="secondModel[3]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => secondModel[3] = Number(num)" />
                </div>

                <div class="flex justify-center">
                    <UButton :label="secondHint[0]" :color="secondHint[0]" size="xl" class="mx-2 my-2" />
                    <UButton :label="secondHint[1]" :color="secondHint[1]" size="xl" class="mx-2 my-2" />
                    <UButton :label="secondHint[2]" :color="secondHint[2]" size="xl" class="mx-2 my-2" />
                    <UButton :label="secondHint[3]" :color="secondHint[3]" size="xl" class="mx-2 my-2" />
                </div>
            </div>

            <div v-if="step >= 3" class="my-8">
                <h2 class="flex justify-center">Devine le code essai 3/3</h2>
                <div class="flex justify-center">
                    <USelect :model-value="thirdModel[0]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => thirdModel[0] = Number(num)" />
                    <USelect :model-value="thirdModel[1]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => thirdModel[1] = Number(num)" />
                    <USelect :model-value="thirdModel[2]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => thirdModel[2] = Number(num)" />
                    <USelect :model-value="thirdModel[3]" size="xl" :options="numbers" class="mx-2 my-2"
                        @update:model-value="(num: string) => thirdModel[3] = Number(num)" />
                </div>

                <div class="flex justify-center">
                    <UButton :label="thirdHint[0]" :color="thirdHint[0]" size="xl" class="mx-2 my-2" />
                    <UButton :label="thirdHint[1]" :color="thirdHint[1]" size="xl" class="mx-2 my-2" />
                    <UButton :label="thirdHint[2]" :color="thirdHint[2]" size="xl" class="mx-2 my-2" />
                    <UButton :label="thirdHint[3]" :color="thirdHint[3]" size="xl" class="mx-2 my-2" />
                </div>
            </div>

            <div v-if="step >= 4" class="flex justify-center my-8">
                <img v-if="win" src="/public/win.png" width="300" height="400" draggable="false">
                <img v-else src="/public/loose.png" width="300" height="400" draggable="false">
            </div>
        </div>

        <template #footer>
            <UButton label="Commencer" size="xl" v-if="step === 0" @click="generatePassCode()" />
            <UButton label="Suivant" size="xl" v-if="(0 < step) && (step < 4)" @click="nextStep()" />
            <UButton label="Recommencer" size="xl" v-if="step === 4" @click="reload()" />
        </template>
    </UCard>
</template>

<script lang="ts" setup>
import { generateNumberBetweenOneAndNine } from '~/utils/utils'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const passCode = ref([0, 0, 0, 0])
const step = ref(0)
const firstModel = ref<number[]>([1, 1, 1, 1])
const firstHint = ref(['yellow', 'yellow', 'yellow', 'yellow'])
const secondModel = ref([1, 1, 1, 1])
const secondHint = ref(['yellow', 'yellow', 'yellow', 'yellow'])
const thirdModel = ref([1, 1, 1, 1])
const thirdHint = ref(['yellow', 'yellow', 'yellow', 'yellow'])
const win = ref()


const generatePassCode = () => {
    passCode.value[0] = generateNumberBetweenOneAndNine()
    passCode.value[1] = generateNumberBetweenOneAndNine()
    passCode.value[2] = generateNumberBetweenOneAndNine()
    passCode.value[3] = generateNumberBetweenOneAndNine()
    step.value = 1
}

const nextStep = () => {
    if (step.value === 1) {
        if (firstModel.value[0] === passCode.value[0]
            && firstModel.value[1] === passCode.value[1]
            && firstModel.value[2] === passCode.value[2]
            && firstModel.value[3] === passCode.value[3]
        ) {
            step.value = 4
            win.value = true
        } else {
            for (let i = 0; i <= 3; i++) {
                if (firstModel.value[i] === passCode.value[i]) {
                    firstHint.value[i] = 'green'
                }
                else if (passCode.value.includes(firstModel.value[i])) {
                    firstHint.value[i] = 'orange'
                }
                else {
                    firstHint.value[i] = 'red'
                }
            }
            step.value = 2
        }
    } else if (step.value === 2) {
        if (secondModel.value[0] === passCode.value[0]
            && secondModel.value[1] === passCode.value[1]
            && secondModel.value[2] === passCode.value[2]
            && secondModel.value[3] === passCode.value[3]
        ) {
            step.value = 4
            win.value = true
        } else {
            for (let i = 0; i <= 3; i++) {
                if (secondModel.value[i] === passCode.value[i]) {
                    secondHint.value[i] = 'green'
                }
                else if (passCode.value.includes(secondModel.value[i])) {
                    secondHint.value[i] = 'orange'
                }
                else {
                    secondHint.value[i] = 'red'
                }
            }
            step.value = 3
        }
    } else if (step.value === 3) {
        if (thirdModel.value[0] === passCode.value[0]
            && thirdModel.value[1] === passCode.value[1]
            && thirdModel.value[2] === passCode.value[2]
            && thirdModel.value[3] === passCode.value[3]
        ) {
            step.value = 4
            win.value = true
        } else {
            for (let i = 0; i <= 3; i++) {
                if (thirdModel.value[i] === passCode.value[i]) {
                    thirdHint.value[i] = 'green'
                }
                else if (passCode.value.includes(thirdModel.value[i])) {
                    thirdHint.value[i] = 'orange'
                }
                else {
                    thirdHint.value[i] = 'red'
                }
            }
            step.value = 4
            win.value = false
        }
    }
}

const reload = () => {
    window.location.reload()
}
</script>