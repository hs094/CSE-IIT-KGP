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
static const char *ng0 = "/home/nikhil/Desktop/COA_Lab_Grp_60/COA_lab_Grp_60/branching_mechanism.v";
static unsigned int ng1[] = {0U, 0U};
static unsigned int ng2[] = {1U, 0U};
static unsigned int ng3[] = {2U, 0U};
static unsigned int ng4[] = {3U, 0U};



static void Always_48_0(char *t0)
{
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t5;
    unsigned int t6;
    unsigned int t7;
    unsigned int t8;
    unsigned int t9;
    unsigned int t10;
    char *t11;
    char *t12;

LAB0:    t1 = (t0 + 3800U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(48, ng0);
    t2 = (t0 + 4368);
    *((int *)t2) = 1;
    t3 = (t0 + 3832);
    *((char **)t3) = t2;
    *((char **)t1) = &&LAB4;

LAB1:    return;
LAB4:    xsi_set_current_line(48, ng0);

LAB5:    xsi_set_current_line(49, ng0);
    t4 = (t0 + 2008U);
    t5 = *((char **)t4);
    t4 = (t5 + 4);
    t6 = *((unsigned int *)t4);
    t7 = (~(t6));
    t8 = *((unsigned int *)t5);
    t9 = (t8 & t7);
    t10 = (t9 != 0);
    if (t10 > 0)
        goto LAB6;

LAB7:    xsi_set_current_line(52, ng0);
    t2 = (t0 + 1848U);
    t3 = *((char **)t2);
    t2 = (t0 + 2888);
    xsi_vlogvar_wait_assign_value(t2, t3, 0, 0, 3, 0LL);

LAB8:    goto LAB2;

LAB6:    xsi_set_current_line(50, ng0);
    t11 = ((char*)((ng1)));
    t12 = (t0 + 2888);
    xsi_vlogvar_wait_assign_value(t12, t11, 0, 0, 3, 0LL);
    goto LAB8;

}

static void Always_55_1(char *t0)
{
    char t6[8];
    char t18[8];
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t5;
    char *t7;
    unsigned int t8;
    unsigned int t9;
    unsigned int t10;
    unsigned int t11;
    unsigned int t12;
    int t13;
    int t14;
    char *t15;
    unsigned int t16;
    char *t17;
    char *t19;
    char *t20;
    unsigned int t21;
    unsigned int t22;
    unsigned int t23;
    unsigned int t24;
    unsigned int t25;
    unsigned int t26;
    unsigned int t27;
    unsigned int t28;
    unsigned int t29;
    unsigned int t30;
    unsigned int t31;
    unsigned int t32;
    char *t33;
    char *t34;
    unsigned int t35;
    unsigned int t36;
    unsigned int t37;
    unsigned int t38;
    unsigned int t39;
    char *t40;
    char *t41;
    char *t42;
    char *t43;
    char *t44;

LAB0:    t1 = (t0 + 4048U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(55, ng0);
    t2 = (t0 + 4384);
    *((int *)t2) = 1;
    t3 = (t0 + 4080);
    *((char **)t3) = t2;
    *((char **)t1) = &&LAB4;

LAB1:    return;
LAB4:    xsi_set_current_line(55, ng0);

LAB5:    xsi_set_current_line(56, ng0);
    t4 = (t0 + 1048U);
    t5 = *((char **)t4);
    t4 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t5, 32, t4, 32);
    t7 = (t0 + 2728);
    xsi_vlogvar_wait_assign_value(t7, t6, 0, 0, 32, 0LL);
    xsi_set_current_line(57, ng0);
    t2 = (t0 + 2008U);
    t3 = *((char **)t2);
    t2 = (t3 + 4);
    t8 = *((unsigned int *)t2);
    t9 = (~(t8));
    t10 = *((unsigned int *)t3);
    t11 = (t10 & t9);
    t12 = (t11 != 0);
    if (t12 > 0)
        goto LAB6;

LAB7:    xsi_set_current_line(59, ng0);

LAB9:    xsi_set_current_line(60, ng0);
    t2 = (t0 + 1528U);
    t3 = *((char **)t2);

LAB10:    t2 = ((char*)((ng2)));
    t13 = xsi_vlog_unsigned_case_compare(t3, 2, t2, 2);
    if (t13 == 1)
        goto LAB11;

LAB12:    t2 = ((char*)((ng3)));
    t13 = xsi_vlog_unsigned_case_compare(t3, 2, t2, 2);
    if (t13 == 1)
        goto LAB13;

LAB14:    t2 = ((char*)((ng4)));
    t13 = xsi_vlog_unsigned_case_compare(t3, 2, t2, 2);
    if (t13 == 1)
        goto LAB15;

LAB16:
LAB18:
LAB17:    xsi_set_current_line(114, ng0);

LAB89:    xsi_set_current_line(115, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t15 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t15, t6, 0, 0, 32, 0LL);

LAB19:
LAB8:    goto LAB2;

LAB6:    xsi_set_current_line(58, ng0);
    t4 = ((char*)((ng1)));
    t5 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t5, t4, 0, 0, 32, 0LL);
    goto LAB8;

LAB11:    xsi_set_current_line(61, ng0);

LAB20:    xsi_set_current_line(62, ng0);
    t4 = (t0 + 1688U);
    t5 = *((char **)t4);

LAB21:    t4 = ((char*)((ng1)));
    t14 = xsi_vlog_unsigned_case_compare(t5, 6, t4, 6);
    if (t14 == 1)
        goto LAB22;

LAB23:    t2 = ((char*)((ng2)));
    t13 = xsi_vlog_unsigned_case_compare(t5, 6, t2, 6);
    if (t13 == 1)
        goto LAB24;

LAB25:    t2 = ((char*)((ng3)));
    t13 = xsi_vlog_unsigned_case_compare(t5, 6, t2, 6);
    if (t13 == 1)
        goto LAB26;

LAB27:    t2 = ((char*)((ng4)));
    t13 = xsi_vlog_unsigned_case_compare(t5, 6, t2, 6);
    if (t13 == 1)
        goto LAB28;

LAB29:
LAB31:
LAB30:    xsi_set_current_line(84, ng0);

LAB58:    xsi_set_current_line(85, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t7 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t7, t6, 0, 0, 32, 0LL);

LAB32:    goto LAB19;

LAB13:    xsi_set_current_line(89, ng0);

LAB59:    xsi_set_current_line(90, ng0);
    t4 = (t0 + 1688U);
    t7 = *((char **)t4);

LAB60:    t4 = ((char*)((ng1)));
    t14 = xsi_vlog_unsigned_case_compare(t7, 6, t4, 6);
    if (t14 == 1)
        goto LAB61;

LAB62:    t2 = ((char*)((ng2)));
    t13 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t13 == 1)
        goto LAB63;

LAB64:    t2 = ((char*)((ng3)));
    t13 = xsi_vlog_unsigned_case_compare(t7, 6, t2, 6);
    if (t13 == 1)
        goto LAB65;

LAB66:
LAB68:
LAB67:    xsi_set_current_line(106, ng0);

LAB87:    xsi_set_current_line(107, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t15 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t15, t6, 0, 0, 32, 0LL);

LAB69:    goto LAB19;

LAB15:    xsi_set_current_line(111, ng0);

LAB88:    xsi_set_current_line(112, ng0);
    t4 = (t0 + 1208U);
    t15 = *((char **)t4);
    t4 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t4, t15, 0, 0, 32, 0LL);
    goto LAB19;

LAB22:    xsi_set_current_line(63, ng0);

LAB33:    xsi_set_current_line(64, ng0);
    t7 = (t0 + 1368U);
    t15 = *((char **)t7);
    t7 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t7, t15, 0, 0, 32, 0LL);
    goto LAB32;

LAB24:    xsi_set_current_line(66, ng0);

LAB34:    xsi_set_current_line(67, ng0);
    t4 = (t0 + 1848U);
    t7 = *((char **)t4);
    memset(t6, 0, 8);
    t4 = (t6 + 4);
    t15 = (t7 + 4);
    t8 = *((unsigned int *)t7);
    t9 = (t8 >> 1);
    t10 = (t9 & 1);
    *((unsigned int *)t6) = t10;
    t11 = *((unsigned int *)t15);
    t12 = (t11 >> 1);
    t16 = (t12 & 1);
    *((unsigned int *)t4) = t16;
    t17 = ((char*)((ng2)));
    memset(t18, 0, 8);
    t19 = (t6 + 4);
    t20 = (t17 + 4);
    t21 = *((unsigned int *)t6);
    t22 = *((unsigned int *)t17);
    t23 = (t21 ^ t22);
    t24 = *((unsigned int *)t19);
    t25 = *((unsigned int *)t20);
    t26 = (t24 ^ t25);
    t27 = (t23 | t26);
    t28 = *((unsigned int *)t19);
    t29 = *((unsigned int *)t20);
    t30 = (t28 | t29);
    t31 = (~(t30));
    t32 = (t27 & t31);
    if (t32 != 0)
        goto LAB38;

LAB35:    if (t30 != 0)
        goto LAB37;

LAB36:    *((unsigned int *)t18) = 1;

LAB38:    t34 = (t18 + 4);
    t35 = *((unsigned int *)t34);
    t36 = (~(t35));
    t37 = *((unsigned int *)t18);
    t38 = (t37 & t36);
    t39 = (t38 != 0);
    if (t39 > 0)
        goto LAB39;

LAB40:    xsi_set_current_line(70, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t7 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t7, t6, 0, 0, 32, 0LL);

LAB41:    goto LAB32;

LAB26:    xsi_set_current_line(72, ng0);

LAB42:    xsi_set_current_line(73, ng0);
    t4 = (t0 + 1848U);
    t7 = *((char **)t4);
    memset(t6, 0, 8);
    t4 = (t6 + 4);
    t15 = (t7 + 4);
    t8 = *((unsigned int *)t7);
    t9 = (t8 >> 0);
    t10 = (t9 & 1);
    *((unsigned int *)t6) = t10;
    t11 = *((unsigned int *)t15);
    t12 = (t11 >> 0);
    t16 = (t12 & 1);
    *((unsigned int *)t4) = t16;
    t17 = ((char*)((ng2)));
    memset(t18, 0, 8);
    t19 = (t6 + 4);
    t20 = (t17 + 4);
    t21 = *((unsigned int *)t6);
    t22 = *((unsigned int *)t17);
    t23 = (t21 ^ t22);
    t24 = *((unsigned int *)t19);
    t25 = *((unsigned int *)t20);
    t26 = (t24 ^ t25);
    t27 = (t23 | t26);
    t28 = *((unsigned int *)t19);
    t29 = *((unsigned int *)t20);
    t30 = (t28 | t29);
    t31 = (~(t30));
    t32 = (t27 & t31);
    if (t32 != 0)
        goto LAB46;

LAB43:    if (t30 != 0)
        goto LAB45;

LAB44:    *((unsigned int *)t18) = 1;

LAB46:    t34 = (t18 + 4);
    t35 = *((unsigned int *)t34);
    t36 = (~(t35));
    t37 = *((unsigned int *)t18);
    t38 = (t37 & t36);
    t39 = (t38 != 0);
    if (t39 > 0)
        goto LAB47;

LAB48:    xsi_set_current_line(76, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t7 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t7, t6, 0, 0, 32, 0LL);

LAB49:    goto LAB32;

LAB28:    xsi_set_current_line(78, ng0);

LAB50:    xsi_set_current_line(79, ng0);
    t4 = (t0 + 1848U);
    t7 = *((char **)t4);
    memset(t6, 0, 8);
    t4 = (t6 + 4);
    t15 = (t7 + 4);
    t8 = *((unsigned int *)t7);
    t9 = (t8 >> 0);
    t10 = (t9 & 1);
    *((unsigned int *)t6) = t10;
    t11 = *((unsigned int *)t15);
    t12 = (t11 >> 0);
    t16 = (t12 & 1);
    *((unsigned int *)t4) = t16;
    t17 = ((char*)((ng1)));
    memset(t18, 0, 8);
    t19 = (t6 + 4);
    t20 = (t17 + 4);
    t21 = *((unsigned int *)t6);
    t22 = *((unsigned int *)t17);
    t23 = (t21 ^ t22);
    t24 = *((unsigned int *)t19);
    t25 = *((unsigned int *)t20);
    t26 = (t24 ^ t25);
    t27 = (t23 | t26);
    t28 = *((unsigned int *)t19);
    t29 = *((unsigned int *)t20);
    t30 = (t28 | t29);
    t31 = (~(t30));
    t32 = (t27 & t31);
    if (t32 != 0)
        goto LAB54;

LAB51:    if (t30 != 0)
        goto LAB53;

LAB52:    *((unsigned int *)t18) = 1;

LAB54:    t34 = (t18 + 4);
    t35 = *((unsigned int *)t34);
    t36 = (~(t35));
    t37 = *((unsigned int *)t18);
    t38 = (t37 & t36);
    t39 = (t38 != 0);
    if (t39 > 0)
        goto LAB55;

LAB56:    xsi_set_current_line(82, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t7 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t7, t6, 0, 0, 32, 0LL);

LAB57:    goto LAB32;

LAB37:    t33 = (t18 + 4);
    *((unsigned int *)t18) = 1;
    *((unsigned int *)t33) = 1;
    goto LAB38;

LAB39:    xsi_set_current_line(68, ng0);
    t40 = (t0 + 1208U);
    t41 = *((char **)t40);
    t40 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t40, t41, 0, 0, 32, 0LL);
    goto LAB41;

LAB45:    t33 = (t18 + 4);
    *((unsigned int *)t18) = 1;
    *((unsigned int *)t33) = 1;
    goto LAB46;

LAB47:    xsi_set_current_line(74, ng0);
    t40 = (t0 + 1208U);
    t41 = *((char **)t40);
    t40 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t40, t41, 0, 0, 32, 0LL);
    goto LAB49;

LAB53:    t33 = (t18 + 4);
    *((unsigned int *)t18) = 1;
    *((unsigned int *)t33) = 1;
    goto LAB54;

LAB55:    xsi_set_current_line(80, ng0);
    t40 = (t0 + 1208U);
    t41 = *((char **)t40);
    t40 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t40, t41, 0, 0, 32, 0LL);
    goto LAB57;

LAB61:    xsi_set_current_line(91, ng0);

LAB70:    xsi_set_current_line(92, ng0);
    t15 = (t0 + 1208U);
    t17 = *((char **)t15);
    t15 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t15, t17, 0, 0, 32, 0LL);
    goto LAB69;

LAB63:    xsi_set_current_line(94, ng0);

LAB71:    xsi_set_current_line(95, ng0);
    t4 = (t0 + 2888);
    t15 = (t4 + 56U);
    t17 = *((char **)t15);
    memset(t6, 0, 8);
    t19 = (t6 + 4);
    t20 = (t17 + 4);
    t8 = *((unsigned int *)t17);
    t9 = (t8 >> 2);
    t10 = (t9 & 1);
    *((unsigned int *)t6) = t10;
    t11 = *((unsigned int *)t20);
    t12 = (t11 >> 2);
    t16 = (t12 & 1);
    *((unsigned int *)t19) = t16;
    t33 = ((char*)((ng2)));
    memset(t18, 0, 8);
    t34 = (t6 + 4);
    t40 = (t33 + 4);
    t21 = *((unsigned int *)t6);
    t22 = *((unsigned int *)t33);
    t23 = (t21 ^ t22);
    t24 = *((unsigned int *)t34);
    t25 = *((unsigned int *)t40);
    t26 = (t24 ^ t25);
    t27 = (t23 | t26);
    t28 = *((unsigned int *)t34);
    t29 = *((unsigned int *)t40);
    t30 = (t28 | t29);
    t31 = (~(t30));
    t32 = (t27 & t31);
    if (t32 != 0)
        goto LAB75;

LAB72:    if (t30 != 0)
        goto LAB74;

LAB73:    *((unsigned int *)t18) = 1;

LAB75:    t42 = (t18 + 4);
    t35 = *((unsigned int *)t42);
    t36 = (~(t35));
    t37 = *((unsigned int *)t18);
    t38 = (t37 & t36);
    t39 = (t38 != 0);
    if (t39 > 0)
        goto LAB76;

LAB77:    xsi_set_current_line(98, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t15 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t15, t6, 0, 0, 32, 0LL);

LAB78:    goto LAB69;

LAB65:    xsi_set_current_line(100, ng0);

LAB79:    xsi_set_current_line(101, ng0);
    t4 = (t0 + 2888);
    t15 = (t4 + 56U);
    t17 = *((char **)t15);
    memset(t6, 0, 8);
    t19 = (t6 + 4);
    t20 = (t17 + 4);
    t8 = *((unsigned int *)t17);
    t9 = (t8 >> 2);
    t10 = (t9 & 1);
    *((unsigned int *)t6) = t10;
    t11 = *((unsigned int *)t20);
    t12 = (t11 >> 2);
    t16 = (t12 & 1);
    *((unsigned int *)t19) = t16;
    t33 = ((char*)((ng1)));
    memset(t18, 0, 8);
    t34 = (t6 + 4);
    t40 = (t33 + 4);
    t21 = *((unsigned int *)t6);
    t22 = *((unsigned int *)t33);
    t23 = (t21 ^ t22);
    t24 = *((unsigned int *)t34);
    t25 = *((unsigned int *)t40);
    t26 = (t24 ^ t25);
    t27 = (t23 | t26);
    t28 = *((unsigned int *)t34);
    t29 = *((unsigned int *)t40);
    t30 = (t28 | t29);
    t31 = (~(t30));
    t32 = (t27 & t31);
    if (t32 != 0)
        goto LAB83;

LAB80:    if (t30 != 0)
        goto LAB82;

LAB81:    *((unsigned int *)t18) = 1;

LAB83:    t42 = (t18 + 4);
    t35 = *((unsigned int *)t42);
    t36 = (~(t35));
    t37 = *((unsigned int *)t18);
    t38 = (t37 & t36);
    t39 = (t38 != 0);
    if (t39 > 0)
        goto LAB84;

LAB85:    xsi_set_current_line(104, ng0);
    t2 = (t0 + 1048U);
    t4 = *((char **)t2);
    t2 = ((char*)((ng2)));
    memset(t6, 0, 8);
    xsi_vlog_unsigned_add(t6, 32, t4, 32, t2, 32);
    t15 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t15, t6, 0, 0, 32, 0LL);

LAB86:    goto LAB69;

LAB74:    t41 = (t18 + 4);
    *((unsigned int *)t18) = 1;
    *((unsigned int *)t41) = 1;
    goto LAB75;

LAB76:    xsi_set_current_line(96, ng0);
    t43 = (t0 + 1208U);
    t44 = *((char **)t43);
    t43 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t43, t44, 0, 0, 32, 0LL);
    goto LAB78;

LAB82:    t41 = (t18 + 4);
    *((unsigned int *)t18) = 1;
    *((unsigned int *)t41) = 1;
    goto LAB83;

LAB84:    xsi_set_current_line(102, ng0);
    t43 = (t0 + 1208U);
    t44 = *((char **)t43);
    t43 = (t0 + 2568);
    xsi_vlogvar_wait_assign_value(t43, t44, 0, 0, 32, 0LL);
    goto LAB86;

}


extern void work_m_00928092416004724197_2134948942_init()
{
	static char *pe[] = {(void *)Always_48_0,(void *)Always_55_1};
	xsi_register_didat("work_m_00928092416004724197_2134948942", "isim/KGP_RISC_tb_isim_beh.exe.sim/work/m_00928092416004724197_2134948942.didat");
	xsi_register_executes(pe);
}
