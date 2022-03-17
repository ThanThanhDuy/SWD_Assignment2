<template>
  <div class="grid grid-cols-2 mx-20 mt-10 main">
    <!-- option to print pdf -->
    <div class="grid grid-rows-4 col-span-1 box">
      <!-- option1 -->
      <div class="grid grid-cols-2 mb-5">
        <!-- topcv -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedTopcv"
            @change="handleListAttr('isSelectedTopcv')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            TopCV
          </label>
        </div>
        <!-- timviec365 -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedTimviec365"
            @change="handleListAttr('isSelectedTimviec365')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            TimViec365
          </label>
        </div>
      </div>
      <!-- option2 -->
      <div class="grid grid-cols-3 mb-5">
        <!-- level -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedLevel"
            @change="handleListAttr('isSelectedLevel')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            Level
          </label>
        </div>
        <!-- experience -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedExperience"
            @change="handleListAttr('isSelectedExperience')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            Experience
          </label>
        </div>
        <!--  Working Methods -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedWorkingMethods"
            @change="handleListAttr('isSelectedWorkingMethods')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            Working Methods
          </label>
        </div>
      </div>
      <!-- option3 -->
      <div class="grid grid-cols-3 mb-5">
        <!-- salary -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedSalary"
            @change="handleListAttr('isSelectedSalary')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            Salary
          </label>
        </div>
        <!-- Gender -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedGender"
            @change="handleListAttr('isSelectedGender')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            Gender
          </label>
        </div>
        <!--  Address Working -->
        <div>
          <input
            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            v-model="isSelectedAddress"
            @change="handleListAttr('isSelectedAddress')"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            Address Working
          </label>
        </div>
      </div>
      <!-- handle pdf -->
      <div class="grid grid-cols-3 mb-5">
        <!-- Select All -->
        <div>
          <button
            v-if="!isSelectedAll"
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="selectAll"
          >
            Select All
          </button>
          <button
            v-else
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="selectAll"
          >
            UnSelected All
          </button>
        </div>
        <!-- Preview PDF -->
        <div>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="exportPdf(true)"
          >
            Preview PDF
          </button>
        </div>
        <!--  Download PDF -->
        <div>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="exportPdf(false)"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
    <!-- controll data to export -->
  </div>
</template>

<script>
import jsPDF from 'jspdf'
const removeVietnameseTones = require('../util/removeVietnameseTones')
const breakLineText = require('../util/breakLineText')

export default {
  data() {
    return {
      fileName: `Report TopCV`,
      time: `${new Date().toLocaleDateString()}`,
      marginTop: 6,
      countLine: 1,
      isSelectedTopcv: true,
      isSelectedTimviec365: false,
      isSelectedSalary: true,
      isSelectedGender: false,
      isSelectedAddress: false,
      isSelectedLevel: true,
      isSelectedExperience: true,
      isSelectedWorkingMethods: true,
      isSelectedAll: false,
      listAttr: [
        'id_job',
        'name_job',
        'name_company',
        'level',
        'experience',
        'working_methods',
        'salary'
      ],
      listCondition: [{ web: 'topcv.vn' }]
    }
  },
  methods: {
    handleListAttr(attr) {
      console.info(attr)
      switch (attr) {
        case 'isSelectedTopcv':
          {
            if (this.isSelectedTopcv) {
              this.listCondition.push({ web: 'topcv.vn' })
            } else {
              const index = this.listCondition.findIndex(
                item => item.web === 'topcv.vn'
              )
              this.listCondition.splice(index, 1)
            }
          }
          break
        case 'isSelectedTimviec365':
          {
            if (this.isSelectedTimviec365) {
              this.listCondition.push({ web: 'timviec365.com' })
            } else {
              const index = this.listCondition.findIndex(
                item => item.web === 'timviec365.com'
              )
              this.listCondition.splice(index, 1)
            }
          }
          break
        case 'isSelectedLevel':
          {
            if (this.isSelectedLevel) {
              this.listAttr.push('level')
            } else {
              this.listAttr.splice(this.listAttr.indexOf('level'), 1)
            }
          }
          break
        case 'isSelectedExperience':
          {
            if (this.isSelectedExperience) {
              this.listAttr.push('experience')
            } else {
              this.listAttr.splice(this.listAttr.indexOf('experience'), 1)
            }
          }
          break
        case 'isSelectedWorkingMethods':
          {
            if (this.isSelectedWorkingMethods) {
              this.listAttr.push('working_methods')
            } else {
              this.listAttr.splice(this.listAttr.indexOf('working_methods'), 1)
            }
          }
          break
        case 'isSelectedSalary':
          {
            if (this.isSelectedSalary) {
              this.listAttr.push('salary')
            } else {
              this.listAttr.splice(this.listAttr.indexOf('salary'), 1)
            }
          }
          break
        case 'isSelectedGender':
          {
            if (this.isSelectedGender) {
              this.listAttr.push('gender')
            } else {
              this.listAttr.splice(this.listAttr.indexOf('gender'), 1)
            }
          }
          break
        case 'isSelectedAddress':
          {
            if (this.isSelectedAddress) {
              this.listAttr.push('address_working')
            } else {
              this.listAttr.splice(this.listAttr.indexOf('address_working'), 1)
            }
          }
          break
      }
      console.log(this.listAttr)
      console.log(this.listCondition)
    },
    selectAll() {
      this.isSelectedAll = !this.isSelectedAll
      if (this.isSelectedAll) {
        this.isSelectedTopcv = true
        this.isSelectedTimviec365 = true
        this.isSelectedSalary = true
        this.isSelectedGender = true
        this.isSelectedAddress = true
        this.isSelectedLevel = true
        this.isSelectedExperience = true
        this.isSelectedWorkingMethods = true
        this.listAttr = [
          'level',
          'experience',
          'working_methods',
          'salary',
          'gender',
          'address_working'
        ]
        this.listCondition = [{ web: 'topcv.vn' }, { web: 'timviec365.com' }]
        console.log(this.listAttr)
        console.log(this.listCondition)
      } else {
        this.isSelectedTopcv = false
        this.isSelectedTimviec365 = false
        this.isSelectedSalary = false
        this.isSelectedGender = false
        this.isSelectedAddress = false
        this.isSelectedLevel = false
        this.isSelectedExperience = false
        this.isSelectedWorkingMethods = false
        this.listAttr = []
        this.listCondition = []
        console.log(this.listAttr)
        console.log(this.listCondition)
      }
    },
    async exportPdf(isPreview) {
      const res = await this.$axios.post('/api/v1/job/getJobFromDBToPDF', {
        listAttr: this.listAttr,
        listCondition: this.listCondition
      })
      const data = res.data.data
      let doc = new jsPDF()
      doc.setFontSize(12) // set font size
      let marginTop = this.marginTop
      let countLine = this.countLine
      let marginLeftLine = 46
      let countToCut = 78
      // header
      doc.text(this.fileName, 10, marginTop)
      doc.text(this.time, 200, marginTop, null, null, 'right')
      // main content
      for (const item of data) {
        if (countLine % 47 === 0) {
          doc.addPage('a4')
          countLine = this.countLine
        }
        this.writeLine(doc, '------------', 105, 'center', ++countLine)
        // job ID
        doc.setTextColor(220, 38, 38)
        if (countLine % 47 === 0) {
          doc.addPage('a4')
          countLine = this.countLine
        }
        this.writeLine(doc, `ID Job:`, 10, 'left', ++countLine)
        doc.setTextColor(0, 0, 0)
        this.writeLine(doc, `${item.id_job}`, marginLeftLine, 'left', countLine)
        // job name
        doc.setTextColor(4, 120, 87)
        if (countLine % 47 === 0) {
          doc.addPage('a4')
          countLine = this.countLine
        }
        this.writeLine(doc, `ID Name:`, 10, 'left', ++countLine)
        doc.setTextColor(0, 0, 0)
        const arr = breakLineText(item.name_job, countToCut)
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            this.writeLine(
              doc,
              removeVietnameseTones(arr[i]),
              marginLeftLine,
              'left',
              countLine
            )
          } else {
            if (countLine % 47 === 0) {
              doc.addPage('a4')
              countLine = this.countLine
            }
            this.writeLine(
              doc,
              removeVietnameseTones(arr[i]),
              marginLeftLine,
              'left',
              ++countLine
            )
          }
        }
        // salary
        if (this.isSelectedSalary) {
          doc.setTextColor(245, 158, 11)
          if (countLine % 47 === 0) {
            doc.addPage('a4')
            countLine = this.countLine
          }
          this.writeLine(doc, `Salary:`, 10, 'left', ++countLine)
          doc.setTextColor(0, 0, 0)
          this.writeLine(
            doc,
            removeVietnameseTones(item.salary),
            marginLeftLine,
            'left',
            countLine
          )
        }
        // level
        if (this.isSelectedLevel) {
          doc.setTextColor(6, 182, 212)
          if (countLine % 47 === 0) {
            doc.addPage('a4')
            countLine = this.countLine
          }
          this.writeLine(doc, `Level:`, 10, 'left', ++countLine)
          doc.setTextColor(0, 0, 0)
          this.writeLine(
            doc,
            removeVietnameseTones(item.level),
            marginLeftLine,
            'left',
            countLine
          )
        }
        // experience
        if (this.isSelectedExperience) {
          doc.setTextColor(79, 70, 229)
          if (countLine % 47 === 0) {
            doc.addPage('a4')
            countLine = this.countLine
          }
          this.writeLine(doc, `Experience:`, 10, 'left', ++countLine)
          doc.setTextColor(0, 0, 0)
          this.writeLine(
            doc,
            removeVietnameseTones(item.experience),
            marginLeftLine,
            'left',
            countLine
          )
        }
        // Gender
        if (this.isSelectedGender) {
          doc.setTextColor(244, 114, 182)
          if (countLine % 47 === 0) {
            doc.addPage('a4')
            countLine = this.countLine
          }
          this.writeLine(doc, `Gender:`, 10, 'left', ++countLine)
          doc.setTextColor(0, 0, 0)
          this.writeLine(
            doc,
            removeVietnameseTones(item.gender),
            marginLeftLine,
            'left',
            countLine
          )
        }
        // working methods
        if (this.isSelectedWorkingMethods) {
          doc.setTextColor(139, 92, 246)
          if (countLine % 47 === 0) {
            doc.addPage('a4')
            countLine = this.countLine
          }
          this.writeLine(doc, `Working methods:`, 10, 'left', ++countLine)
          doc.setTextColor(0, 0, 0)
          this.writeLine(
            doc,
            removeVietnameseTones(item.working_methods),
            marginLeftLine,
            'left',
            countLine
          )
        }
        // address working
        if (this.isSelectedAddress) {
          if (countLine % 47 === 0) {
            doc.addPage('a4')
            countLine = this.countLine
          }
          this.writeLine(doc, `Address Working:`, 10, 'left', ++countLine)
          const arr1 = breakLineText(item.address_working, countToCut)
          for (let i = 0; i < arr1.length; i++) {
            if (i === 0) {
              this.writeLine(
                doc,
                removeVietnameseTones(arr1[i]),
                marginLeftLine,
                'left',
                countLine
              )
            } else {
              if (countLine % 47 === 0) {
                doc.addPage('a4')
                countLine = this.countLine
              }
              this.writeLine(
                doc,
                removeVietnameseTones(arr1[i]),
                marginLeftLine,
                'left',
                ++countLine
              )
            }
          }
        }
        // name company
        if (countLine % 47 === 0) {
          doc.addPage('a4')
          countLine = this.countLine
        }
        this.writeLine(doc, `Name Company:`, 10, 'left', ++countLine)
        const arr2 = breakLineText(item.name_company, countToCut)
        for (let i = 0; i < arr2.length; i++) {
          if (i === 0) {
            this.writeLine(
              doc,
              removeVietnameseTones(arr2[i]),
              marginLeftLine,
              'left',
              countLine
            )
          } else {
            if (countLine % 47 === 0) {
              doc.addPage('a4')
              countLine = this.countLine
            }
            this.writeLine(
              doc,
              removeVietnameseTones(arr2[i]),
              marginLeftLine,
              'left',
              ++countLine
            )
          }
        }
      }

      if (isPreview) {
        window.open(doc.output('bloburl'))
      } else {
        doc.save('a4.pdf')
      }
    },
    writeLine(doc, text, x, position, countLine) {
      return doc.text(text, x, this.marginTop * countLine, null, null, position)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  box-shadow: rgba(149, 157, 165, 0.4) 0px 1px 10px 10px;
  border-radius: 10px;
  padding: 10px 30px;
}
</style>
