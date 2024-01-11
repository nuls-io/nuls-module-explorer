<template>
  <!-- paging -->
  <div class="paging">
    <el-pagination
            class="pages"
            background
            small
            layout="total,prev, pager, next, jumper"
            :total="pager.total"
            :current-page.sync="pager.page"
            :page-size="pager.rows"
            :pager-count= 5
            @size-change="onChangeSize"
            @current-change="onChangePage">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: ['pager'],
    computed: {
      total() {
        return this.pager.total;
      },
      // Check if no data has been obtained
      initBack() {
        return this.pager.total / this.pager.rows < this.pager.page;
      },
    },
    watch: {
      total() {
        // When there are records but no data has been obtained, Re request
        /*if (this.initBack) {
          this.pager.page -= 1;
          this.$emit('change');
        }*/
      },
    },
    methods: {
      // Number of entries per page
      onChangeSize(rows) {
        this.pager.rows = rows;
        this.$emit('change');
      },
      // Flipping pages
      onChangePage(page) {
        this.pager.page = page;
        this.$emit('change');
      },
    },
  };
</script>

<style lang="less">
  @import "./../assets/css/style";

  .paging {
    background: #fff;
    .pages {
      padding-right: 24px;
      padding-top: 10px;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn-prev,.btn-next{
        width: 28px;
          height: 28px;
          line-height: 28px;
      }
      .el-pager {
        li{
          width: 28px;
          height: 28px;
          line-height: 28px;
        }
        .active {
          background-color: @Ncolour !important;
        }
      }
      .el-pagination__jump {
      }
    }
    @media screen and (max-width: 1000px) {
      .pages {
        .el-pagination__jump {
          display: none;
        }
      }
    }
  }
  @media (max-width: 568px){
    .paging{
      .pages{
        padding-right: initial;
        display: flex;
        flex-wrap: wrap;
        white-space: wrap;
        height: initial;
        .el-pager {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>

