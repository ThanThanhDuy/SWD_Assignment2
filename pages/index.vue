<template>
  <div class="controlBot grid grid-cols-2">
    <div class="topCV">
      <h1 class="text-center font-semibold title">TopCV Control</h1>
      <div class="box_keyword">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-center font-semibold">List Key Word</h2>
          <button
            class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="addKeyword"
          >
            Add Keyword
          </button>
        </div>
        <!-- wrapper keyword -->
        <div class="rec_keyword">
          <div v-for="item in listKeyWord" :key="item.id">
            <div class="flex justify-between mb-4">
              <div class="w-9/12">
                <input
                  v-if="item.status === 'Not Start'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Start'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-yellow-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Running'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-indigo-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Done'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-green-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Error'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-red-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <div
                  v-if="item.running"
                  class="bg-green-300 h-2.5 rounded-full mt-3"
                  :style="{ width: item.percent + '%' }"
                >
                  Time:{{ item.time }}
                </div>
              </div>
              <button
                class="w-2/12 bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                @click="deleteKeyword(item.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <!-- btn add -->
        <div>
          <div class="box_color flex">
            <div class="flex mr-5">
              <div class="bg-gray-200 w-5 h-5 mr-3"></div>
              <span>Not Start</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-yellow-200 w-5 h-5 mr-3"></div>
              <span>Start</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-indigo-200 w-5 h-5 mr-3"></div>
              <span>Running</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-green-200 w-5 h-5 mr-3"></div>
              <span>Done</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-red-200 w-5 h-5 mr-3"></div>
              <span>Error</span>
            </div>
          </div>
        </div>
        <button
          class="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
          type="button"
          @click="getJobFromTopCV"
        >
          Get Job From TopCV
        </button>
      </div>
    </div>
    <div class="timviec365">
      <h1 class="text-center font-semibold title">TimViec365 Control</h1>
      <div class="box_keyword">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-center font-semibold">List Key Word</h2>
          <button
            class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="addKeyword2"
          >
            Add Keyword
          </button>
        </div>
        <!-- wrapper keyword -->
        <div class="rec_keyword">
          <div v-for="item in listKeyWord2" :key="item.id">
            <div class="flex justify-between mb-4">
              <div class="w-9/12">
                <input
                  v-if="item.status === 'Not Start'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Start'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-yellow-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Running'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-indigo-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Done'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-green-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <input
                  v-else-if="item.status === 'Error'"
                  class="shadow w-full appearance-none border rounded py-2 px-3 bg-red-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Keyword"
                  v-model="item.keyword"
                />
                <div
                  v-if="item.running"
                  class="bg-green-300 h-2.5 rounded-full mt-3"
                  :style="{ width: item.percent + '%' }"
                >
                  Time:{{ item.time }}
                </div>
              </div>
              <button
                class="w-2/12 bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                @click="deleteKeyword2(item.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <!-- btn add -->
        <div>
          <div class="box_color flex">
            <div class="flex mr-5">
              <div class="bg-gray-200 w-5 h-5 mr-3"></div>
              <span>Not Start</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-yellow-200 w-5 h-5 mr-3"></div>
              <span>Start</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-indigo-200 w-5 h-5 mr-3"></div>
              <span>Running</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-green-200 w-5 h-5 mr-3"></div>
              <span>Done</span>
            </div>
            <div class="flex mr-5">
              <div class="bg-red-200 w-5 h-5 mr-3"></div>
              <span>Error</span>
            </div>
          </div>
        </div>
        <button
          class="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
          type="button"
          @click="getJobFromTopCV"
        >
          Get Job From TimViec365
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message: '',
      listKeyWord: [
        {
          id: 1,
          keyword: 'lập trình viên net',
          status: 'Not Start'
        },
        {
          id: 2,
          keyword: 'lập trình viên c/c++',
          status: 'Not Start'
        },
        {
          id: 3,
          keyword: 'lập trình viên java',
          status: 'Not Start'
        },
        {
          id: 4,
          keyword: 'lập trình viên javaScript',
          status: 'Not Start'
        },
        {
          id: 5,
          keyword: 'lập trình viên android',
          status: 'Not Start'
        },
        {
          id: 6,
          keyword: 'lập trình viên nodejs',
          status: 'Not Start'
        },
        {
          id: 7,
          keyword: 'lập trình viên angularjs',
          status: 'Not Start'
        },
        {
          id: 8,
          keyword: 'lập trình viên reactjs',
          status: 'Not Start'
        }
      ],
      listKeyWord2: [
        {
          id: 1,
          keyword: 'java',
          status: 'Not Start'
        },
        {
          id: 2,
          keyword: 'react',
          status: 'Not Start'
        },
        {
          id: 3,
          keyword: 'angular',
          status: 'Not Start'
        },
        {
          id: 4,
          keyword: 'nodejs',
          status: 'Not Start'
        },
        {
          id: 5,
          keyword: 'zxc',
          status: 'Not Start'
        },
        {
          id: 6,
          keyword: 'android',
          status: 'Not Start'
        }
      ]
    }
  },
  methods: {
    async getData() {
      const res = await this.$axios.get('/api/v1/job/getJobFromTopCV')
      console.log(res.data)
    },
    addKeyword() {
      this.listKeyWord.push({
        id: this.listKeyWord.length + 1,
        keyword: '',
        status: 'Not Start'
      })
    },
    deleteKeyword(id) {
      this.listKeyWord = this.listKeyWord.filter(item => item.id !== id)
    },
    addKeyword2() {
      this.listKeyWord2.push({
        id: this.listKeyWord2.length + 1,
        keyword: '',
        status: 'Not Start'
      })
    },
    deleteKeyword2(id) {
      this.listKeyWord2 = this.listKeyWord2.filter(item => item.id !== id)
    },
    async getJobFromTopCV() {
      let checkEmptyKeyWord = this.listKeyWord.findIndex(
        item => item.keyword === ''
      )
      if (checkEmptyKeyWord === -1) {
        for (const item of this.listKeyWord) {
          item.status = 'Start'
          console.info(` Estimate ${item.keyword}`)
          setTimeout(() => {
            item.status = 'Running'
          }, 1000)
          const resTime = await this.$axios.get(
            '/api/v1/job/estimateTimeToGetJobFromTopCV',
            {
              params: {
                keyword: item.keyword
              }
            }
          )
          if (resTime.data.success) {
            console.info(
              `estimate crawl ${item.keyword} in ${resTime.data.time} minutes`
            )
            console.info(`Start crawl ${item.keyword}`)
            const res = await this.$axios.post('/api/v1/job/getJobFromTopCV', {
              keyword: item.keyword
            })
            console.info(`Done crawl ${item.keyword} in ${res.data.time}`)
            item.status = 'Done'
          } else {
            console.warn(resTime.data.message)
            item.status = 'Error'
          }
        }
      } else {
        alert('Please enter keyword')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 25px;
}
.topCV,
.timviec365 {
  padding: 0px 100px;
}
.box_keyword {
  border-radius: 10px;
  margin-top: 20px;
  padding: 30px;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 10px 10px;
}
.rec_keyword {
  height: 65vh;
  overflow-y: auto;
  margin-bottom: 10px;
}
</style>
