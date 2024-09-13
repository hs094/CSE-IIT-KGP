/**********************************************************************/
/*   ____  ____                                                       */
/*  /   /\/   /                                                       */
/* /___/  \  /                                                        */
/* \   \   \/                                                       */
/*  \   \        Copyright (c) 2003-2009 Xilinx, Inc.                */
/*  /   /          All Right Reserved.                                 */
/* /---/   /\                                                         */
/* \   \  /  \                                                      */
/*  \___\/\___\                                                    */
/***********************************************************************/

/* This file is designed for use with ISim build 0xfbc00daa */

#define XSI_HIDE_SYMBOL_SPEC true
#include "xsi.h"
#include <memory.h>
#ifdef __GNUC__
#include <stdlib.h>
#else
#include <malloc.h>
#define alloca _alloca
#endif
static const char *ng0 = "/home/nikhil/Desktop/COA_Lab_Grp_60/COA_lab_Grp_60/alu_control.v";
static unsigned int ng1[] = {1U, 0U};
static unsigned int ng2[] = {0U, 0U};
static unsigned int ng3[] = {7U, 0U};
static unsigned int ng4[] = {2U, 0U};
static unsigned int ng5[] = {3U, 0U};
static unsigned int ng6[] = {4U, 0U};
static unsigned int ng7[] = {5U, 0U};
static unsigned int ng8[] = {12U, 0U};
static unsigned int ng9[] = {13U, 0U};
static unsigned int ng10[] = {6U, 0U};
static unsigned int ng11[] = {14U, 0U};



static void Always_46_0(char *t0)
{
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t5;
    int t6;
    char *t7;
    char *t8;
    int t9;
    char *t10;
    char *t11;

LAB0:    t1 = (t0 + 2520U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(46, ng0);
    t2 = (t0 + 2840);
    *((int *)t2) = 1;
    t3 = (t0 + 2552);
    *((char **)t3) = t2;
    *((char **)t1) = &&LAB4;

LAB1:    return;
LAB4:    xsi_set_current_line(46, ng0);

LAB5:    xsi_set_current_line(47, ng0);
    t4 = (t0 + 1048U);
    t5 = *((char **)t4);

LAB6:    t4 = ((char*)((ng1)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 3, t4, 3);
    if (t6 == 1)
        goto LAB7;

LAB8:    t2 = ((char*)((ng4)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 3, t2, 3);
    if (t6 == 1)
        goto LAB9;

LAB10:    t2 = ((char*)((ng5)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 3, t2, 3);
    if (t6 == 1)
        goto LAB11;

LAB12:    t2 = ((char*)((ng7)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 3, t2, 3);
    if (t6 == 1)
        goto LAB13;

LAB14:    t2 = ((char*)((ng10)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 3, t2, 3);
    if (t6 == 1)
        goto LAB15;

LAB16:
LAB18:
LAB17:    xsi_set_current_line(78, ng0);
    t2 = ((char*)((ng3)));
    t3 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t3, t2, 0, 0, 4, 0LL);

LAB19:    goto LAB2;

LAB7:    xsi_set_current_line(49, ng0);

LAB20:    xsi_set_current_line(50, ng0);
    t7 = (t0 + 1208U);
    t8 = *((char **)t7);

LAB21:    t7 = ((char*)((ng2)));
    t9 = xsi_vlog_unsigned_case_compare(t8, 6, t7, 6);
    if (t9 == 1)
        goto LAB22;

LAB23:    t2 = ((char*)((ng1)));
    t6 = xsi_vlog_unsigned_case_compare(t8, 6, t2, 6);
    if (t6 == 1)
        goto LAB24;

LAB25:
LAB27:
LAB26:    xsi_set_current_line(53, ng0);
    t2 = ((char*)((ng3)));
    t3 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t3, t2, 0, 0, 4, 0LL);

LAB28:    goto LAB19;

LAB9:    xsi_set_current_line(57, ng0);

LAB29:    xsi_set_current_line(58, ng0);
    t3 = (t0 + 1208U);
    t4 = *((char **)t3);

LAB30:    t3 = ((char*)((ng2)));
    t9 = xsi_vlog_unsigned_case_compare(t4, 6, t3, 6);
    if (t9 == 1)
        goto LAB31;

LAB32:    t2 = ((char*)((ng1)));
    t6 = xsi_vlog_unsigned_case_compare(t4, 6, t2, 6);
    if (t6 == 1)
        goto LAB33;

LAB34:
LAB36:
LAB35:    xsi_set_current_line(61, ng0);
    t2 = ((char*)((ng3)));
    t3 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t3, t2, 0, 0, 4, 0LL);

LAB37:    goto LAB19;

LAB11:    xsi_set_current_line(65, ng0);

LAB38:    xsi_set_current_line(66, ng0);
    t3 = (t0 + 1208U);
    t7 = *((char **)t3);

LAB39:    t3 = ((char*)((ng2)));
    t9 = xsi_vlog_unsigned_case_compare(t7, 6, t3, 6);
    if (t9 == 1)
        goto LAB40;

LAB41:    t2 = ((char*)((ng1)));
    t6 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t6 == 1)
        goto LAB42;

LAB43:    t2 = ((char*)((ng4)));
    t6 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t6 == 1)
        goto LAB44;

LAB45:    t2 = ((char*)((ng5)));
    t6 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t6 == 1)
        goto LAB46;

LAB47:    t2 = ((char*)((ng6)));
    t6 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t6 == 1)
        goto LAB48;

LAB49:    t2 = ((char*)((ng7)));
    t6 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t6 == 1)
        goto LAB50;

LAB51:
LAB53:
LAB52:    xsi_set_current_line(73, ng0);
    t2 = ((char*)((ng3)));
    t3 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t3, t2, 0, 0, 4, 0LL);

LAB54:    goto LAB19;

LAB13:    xsi_set_current_line(76, ng0);
    t3 = ((char*)((ng2)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB19;

LAB15:    xsi_set_current_line(77, ng0);
    t3 = ((char*)((ng1)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB19;

LAB22:    xsi_set_current_line(51, ng0);
    t10 = ((char*)((ng2)));
    t11 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t11, t10, 0, 0, 4, 0LL);
    goto LAB28;

LAB24:    xsi_set_current_line(52, ng0);
    t3 = ((char*)((ng1)));
    t4 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t4, t3, 0, 0, 4, 0LL);
    goto LAB28;

LAB31:    xsi_set_current_line(59, ng0);
    t7 = ((char*)((ng4)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t7, 0, 0, 4, 0LL);
    goto LAB37;

LAB33:    xsi_set_current_line(60, ng0);
    t3 = ((char*)((ng5)));
    t7 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t7, t3, 0, 0, 4, 0LL);
    goto LAB37;

LAB40:    xsi_set_current_line(67, ng0);
    t10 = ((char*)((ng6)));
    t11 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t11, t10, 0, 0, 4, 0LL);
    goto LAB54;

LAB42:    xsi_set_current_line(68, ng0);
    t3 = ((char*)((ng7)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB54;

LAB44:    xsi_set_current_line(69, ng0);
    t3 = ((char*)((ng8)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB54;

LAB46:    xsi_set_current_line(70, ng0);
    t3 = ((char*)((ng9)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB54;

LAB48:    xsi_set_current_line(71, ng0);
    t3 = ((char*)((ng10)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB54;

LAB50:    xsi_set_current_line(72, ng0);
    t3 = ((char*)((ng11)));
    t10 = (t0 + 1608);
    xsi_vlogvar_wait_assign_value(t10, t3, 0, 0, 4, 0LL);
    goto LAB54;

}


extern void work_m_03984600685327190483_1059438215_init()
{
	static char *pe[] = {(void *)Always_46_0};
	xsi_register_didat("work_m_03984600685327190483_1059438215", "isim/KGP_RISC_tb_isim_beh.exe.sim/work/m_03984600685327190483_1059438215.didat");
	xsi_register_executes(pe);
}
