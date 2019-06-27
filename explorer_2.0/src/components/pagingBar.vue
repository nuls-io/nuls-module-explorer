<template>
  <!-- 分页 -->
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
      // 检测是否获取到无数据
      initBack() {
        return this.pager.total / this.pager.rows < this.pager.page;
      },
    },
    watch: {
      total() {
        // 存在记录但未获取到数据时, 重新请求
        if (this.initBack) {
          this.pager.page -= 1;
          this.$emit('change');
        }
      },
    },
    methods: {
      // 每页条数
      onChangeSize(rows) {
        this.pager.rows = rows;
        this.$emit('change');
      },
      // 翻页
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
    .pages {
      margin: 10px 0 10px 0;
      text-align: right;
      height: 50px;
      .el-pager {
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
</style>

