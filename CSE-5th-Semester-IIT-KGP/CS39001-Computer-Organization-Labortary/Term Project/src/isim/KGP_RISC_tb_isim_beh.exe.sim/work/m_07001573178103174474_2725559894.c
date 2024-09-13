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
static const char *ng0 = "/home/nikhil/Desktop/COA_Lab_Grp_60/COA_lab_Grp_60/alu.v";
static unsigned int ng1[] = {1U, 0U};
static unsigned int ng2[] = {0U, 0U};
static int ng3[] = {0, 0};
static int ng4[] = {1, 0};
static int ng5[] = {2, 0};
static unsigned int ng6[] = {2U, 0U};
static unsigned int ng7[] = {3U, 0U};
static unsigned int ng8[] = {4U, 0U};
static unsigned int ng9[] = {5U, 0U};
static unsigned int ng10[] = {6U, 0U};



static void Cont_40_0(char *t0)
{
    char t3[8];
    char t15[8];
    char *t1;
    char *t2;
    char *t4;
    char *t5;
    unsigned int t6;
    unsigned int t7;
    unsigned int t8;
    unsigned int t9;
    unsigned int t10;
    unsigned int t11;
    unsigned int t12;
    unsigned int t13;
    char *t14;
    char *t16;
    char *t17;
    char *t18;
    char *t19;
    char *t20;
    char *t21;

LAB0:    t1 = (t0 + 5400U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(40, ng0);
    t2 = (t0 + 1208U);
    t4 = *((char **)t2);
    memset(t3, 0, 8);
    t2 = (t3 + 4);
    t5 = (t4 + 4);
    t6 = *((unsigned int *)t4);
    t7 = (~(t6));
    *((unsigned int *)t3) = t7;
    *((unsigned int *)t2) = 0;
    if (*((unsigned int *)t5) != 0)
        goto LAB5;

LAB4:    t12 = *((unsigned int *)t3);
    *((unsigned int *)t3) = (t12 & 4294967295U);
    t13 = *((unsigned int *)t2);
    *((unsigned int *)t2) = (t13 & 4294967295U);
    t14 = ((char*)((ng1)));
    memset(t15, 0, 8);
    xsi_vlog_unsigned_add(t15, 32, t3, 32, t14, 32);
    t16 = (t0 + 7896);
    t17 = (t16 + 56U);
    t18 = *((char **)t17);
    t19 = (t18 + 56U);
    t20 = *((char **)t19);
    memcpy(t20, t15, 8);
    xsi_driver_vfirst_trans(t16, 0, 31);
    t21 = (t0 + 7704);
    *((int *)t21) = 1;

LAB1:    return;
LAB5:    t8 = *((unsigned int *)t3);
    t9 = *((unsigned int *)t5);
    *((unsigned int *)t3) = (t8 | t9);
    t10 = *((unsigned int *)t2);
    t11 = *((unsigned int *)t5);
    *((unsigned int *)t2) = (t10 | t11);
    goto LAB4;

}

static void Cont_41_1(char *t0)
{
    char t5[8];
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    unsigned int t6;
    unsigned int t7;
    unsigned int t8;
    char *t9;
    char *t10;
    unsigned int t11;
    unsigned int t12;
    unsigned int t13;
    unsigned int t14;
    unsigned int t15;
    unsigned int t16;
    unsigned int t17;
    char *t18;
    char *t19;
    unsigned int t20;
    unsigned int t21;
    unsigned int t22;
    unsigned int t23;
    unsigned int t24;
    unsigned int t25;
    unsigned int t26;
    unsigned int t27;
    int t28;
    int t29;
    unsigned int t30;
    unsigned int t31;
    unsigned int t32;
    unsigned int t33;
    unsigned int t34;
    unsigned int t35;
    char *t36;
    char *t37;
    char *t38;
    char *t39;
    char *t40;
    char *t41;

LAB0:    t1 = (t0 + 5648U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(41, ng0);
    t2 = (t0 + 1048U);
    t3 = *((char **)t2);
    t2 = (t0 + 1208U);
    t4 = *((char **)t2);
    t6 = *((unsigned int *)t3);
    t7 = *((unsigned int *)t4);
    t8 = (t6 & t7);
    *((unsigned int *)t5) = t8;
    t2 = (t3 + 4);
    t9 = (t4 + 4);
    t10 = (t5 + 4);
    t11 = *((unsigned int *)t2);
    t12 = *((unsigned int *)t9);
    t13 = (t11 | t12);
    *((unsigned int *)t10) = t13;
    t14 = *((unsigned int *)t10);
    t15 = (t14 != 0);
    if (t15 == 1)
        goto LAB4;

LAB5:
LAB6:    t36 = (t0 + 7960);
    t37 = (t36 + 56U);
    t38 = *((char **)t37);
    t39 = (t38 + 56U);
    t40 = *((char **)t39);
    memcpy(t40, t5, 8);
    xsi_driver_vfirst_trans(t36, 0, 31);
    t41 = (t0 + 7720);
    *((int *)t41) = 1;

LAB1:    return;
LAB4:    t16 = *((unsigned int *)t5);
    t17 = *((unsigned int *)t10);
    *((unsigned int *)t5) = (t16 | t17);
    t18 = (t3 + 4);
    t19 = (t4 + 4);
    t20 = *((unsigned int *)t3);
    t21 = (~(t20));
    t22 = *((unsigned int *)t18);
    t23 = (~(t22));
    t24 = *((unsigned int *)t4);
    t25 = (~(t24));
    t26 = *((unsigned int *)t19);
    t27 = (~(t26));
    t28 = (t21 & t23);
    t29 = (t25 & t27);
    t30 = (~(t28));
    t31 = (~(t29));
    t32 = *((unsigned int *)t10);
    *((unsigned int *)t10) = (t32 & t30);
    t33 = *((unsigned int *)t10);
    *((unsigned int *)t10) = (t33 & t31);
    t34 = *((unsigned int *)t5);
    *((unsigned int *)t5) = (t34 & t30);
    t35 = *((unsigned int *)t5);
    *((unsigned int *)t5) = (t35 & t31);
    goto LAB6;

}

static void Cont_42_2(char *t0)
{
    char t5[8];
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    unsigned int t6;
    unsigned int t7;
    unsigned int t8;
    char *t9;
    char *t10;
    unsigned int t11;
    unsigned int t12;
    unsigned int t13;
    unsigned int t14;
    unsigned int t15;
    unsigned int t16;
    unsigned int t17;
    char *t18;
    char *t19;
    char *t20;
    char *t21;
    char *t22;
    char *t23;

LAB0:    t1 = (t0 + 5896U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(42, ng0);
    t2 = (t0 + 1048U);
    t3 = *((char **)t2);
    t2 = (t0 + 1208U);
    t4 = *((char **)t2);
    t6 = *((unsigned int *)t3);
    t7 = *((unsigned int *)t4);
    t8 = (t6 ^ t7);
    *((unsigned int *)t5) = t8;
    t2 = (t3 + 4);
    t9 = (t4 + 4);
    t10 = (t5 + 4);
    t11 = *((unsigned int *)t2);
    t12 = *((unsigned int *)t9);
    t13 = (t11 | t12);
    *((unsigned int *)t10) = t13;
    t14 = *((unsigned int *)t10);
    t15 = (t14 != 0);
    if (t15 == 1)
        goto LAB4;

LAB5:
LAB6:    t18 = (t0 + 8024);
    t19 = (t18 + 56U);
    t20 = *((char **)t19);
    t21 = (t20 + 56U);
    t22 = *((char **)t21);
    memcpy(t22, t5, 8);
    xsi_driver_vfirst_trans(t18, 0, 31);
    t23 = (t0 + 7736);
    *((int *)t23) = 1;

LAB1:    return;
LAB4:    t16 = *((unsigned int *)t5);
    t17 = *((unsigned int *)t10);
    *((unsigned int *)t5) = (t16 | t17);
    goto LAB6;

}

static void Cont_44_3(char *t0)
{
    char t3[8];
    char t4[8];
    char t6[8];
    char t31[8];
    char *t1;
    char *t2;
    char *t5;
    char *t7;
    unsigned int t8;
    unsigned int t9;
    unsigned int t10;
    unsigned int t11;
    unsigned int t12;
    unsigned int t13;
    char *t14;
    unsigned int t15;
    unsigned int t16;
    unsigned int t17;
    unsigned int t18;
    unsigned int t19;
    char *t20;
    char *t21;
    unsigned int t22;
    unsigned int t23;
    unsigned int t24;
    char *t25;
    char *t26;
    unsigned int t27;
    unsigned int t28;
    unsigned int t29;
    unsigned int t30;
    char *t32;
    char *t33;
    char *t34;
    char *t35;
    char *t36;
    char *t37;
    char *t38;

LAB0:    t1 = (t0 + 6144U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(44, ng0);
    t2 = (t0 + 1528U);
    t5 = *((char **)t2);
    memset(t6, 0, 8);
    t2 = (t6 + 4);
    t7 = (t5 + 4);
    t8 = *((unsigned int *)t5);
    t9 = (t8 >> 3);
    t10 = (t9 & 1);
    *((unsigned int *)t6) = t10;
    t11 = *((unsigned int *)t7);
    t12 = (t11 >> 3);
    t13 = (t12 & 1);
    *((unsigned int *)t2) = t13;
    memset(t4, 0, 8);
    t14 = (t6 + 4);
    t15 = *((unsigned int *)t14);
    t16 = (~(t15));
    t17 = *((unsigned int *)t6);
    t18 = (t17 & t16);
    t19 = (t18 & 1U);
    if (t19 != 0)
        goto LAB4;

LAB5:    if (*((unsigned int *)t14) != 0)
        goto LAB6;

LAB7:    t21 = (t4 + 4);
    t22 = *((unsigned int *)t4);
    t23 = *((unsigned int *)t21);
    t24 = (t22 || t23);
    if (t24 > 0)
        goto LAB8;

LAB9:    t27 = *((unsigned int *)t4);
    t28 = (~(t27));
    t29 = *((unsigned int *)t21);
    t30 = (t28 || t29);
    if (t30 > 0)
        goto LAB10;

LAB11:    if (*((unsigned int *)t21) > 0)
        goto LAB12;

LAB13:    if (*((unsigned int *)t4) > 0)
        goto LAB14;

LAB15:    memcpy(t3, t31, 8);

LAB16:    t33 = (t0 + 8088);
    t34 = (t33 + 56U);
    t35 = *((char **)t34);
    t36 = (t35 + 56U);
    t37 = *((char **)t36);
    memcpy(t37, t3, 8);
    xsi_driver_vfirst_trans(t33, 0, 31);
    t38 = (t0 + 7752);
    *((int *)t38) = 1;

LAB1:    return;
LAB4:    *((unsigned int *)t4) = 1;
    goto LAB7;

LAB6:    t20 = (t4 + 4);
    *((unsigned int *)t4) = 1;
    *((unsigned int *)t20) = 1;
    goto LAB7;

LAB8:    t25 = (t0 + 1208U);
    t26 = *((char **)t25);
    goto LAB9;

LAB10:    t25 = (t0 + 1368U);
    t32 = *((char **)t25);
    t25 = ((char*)((ng2)));
    xsi_vlogtype_concat(t31, 32, 32, 2U, t25, 27, t32, 5);
    goto LAB11;

LAB12:    xsi_vlog_unsigned_bit_combine(t3, 32, t26, 32, t31, 32);
    goto LAB16;

LAB14:    memcpy(t3, t26, 8);
    goto LAB16;

}

static void Cont_45_4(char *t0)
{
    char t5[8];
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t6;
    char *t7;
    char *t8;
    char *t9;
    char *t10;

LAB0:    t1 = (t0 + 6392U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(45, ng0);
    t2 = (t0 + 1048U);
    t3 = *((char **)t2);
    t2 = (t0 + 2968U);
    t4 = *((char **)t2);
    memset(t5, 0, 8);
    xsi_vlog_signed_lshift(t5, 32, t3, 32, t4, 32);
    t2 = (t0 + 8152);
    t6 = (t2 + 56U);
    t7 = *((char **)t6);
    t8 = (t7 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t5, 8);
    xsi_driver_vfirst_trans(t2, 0, 31);
    t10 = (t0 + 7768);
    *((int *)t10) = 1;

LAB1:    return;
}

static void Cont_46_5(char *t0)
{
    char t5[8];
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t6;
    char *t7;
    char *t8;
    char *t9;
    char *t10;

LAB0:    t1 = (t0 + 6640U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(46, ng0);
    t2 = (t0 + 1048U);
    t3 = *((char **)t2);
    t2 = (t0 + 2968U);
    t4 = *((char **)t2);
    memset(t5, 0, 8);
    xsi_vlog_signed_rshift(t5, 32, t3, 32, t4, 32);
    t2 = (t0 + 8216);
    t6 = (t2 + 56U);
    t7 = *((char **)t6);
    t8 = (t7 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t5, 8);
    xsi_driver_vfirst_trans(t2, 0, 31);
    t10 = (t0 + 7784);
    *((int *)t10) = 1;

LAB1:    return;
}

static void Cont_47_6(char *t0)
{
    char t5[8];
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t6;
    char *t7;
    char *t8;
    char *t9;
    char *t10;

LAB0:    t1 = (t0 + 6888U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(47, ng0);
    t2 = (t0 + 1048U);
    t3 = *((char **)t2);
    t2 = (t0 + 2968U);
    t4 = *((char **)t2);
    memset(t5, 0, 8);
    xsi_vlog_signed_arith_rshift(t5, 32, t3, 32, t4, 32);
    t2 = (t0 + 8280);
    t6 = (t2 + 56U);
    t7 = *((char **)t6);
    t8 = (t7 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t5, 8);
    xsi_driver_vfirst_trans(t2, 0, 31);
    t10 = (t0 + 7800);
    *((int *)t10) = 1;

LAB1:    return;
}

static void Always_49_7(char *t0)
{
    char t4[8];
    char t5[8];
    char t8[8];
    char t42[8];
    char t55[8];
    char *t1;
    char *t2;
    char *t3;
    char *t6;
    char *t7;
    char *t9;
    char *t10;
    unsigned int t11;
    unsigned int t12;
    unsigned int t13;
    unsigned int t14;
    unsigned int t15;
    unsigned int t16;
    unsigned int t17;
    unsigned int t18;
    unsigned int t19;
    unsigned int t20;
    unsigned int t21;
    unsigned int t22;
    char *t23;
    char *t24;
    unsigned int t25;
    unsigned int t26;
    unsigned int t27;
    unsigned int t28;
    unsigned int t29;
    char *t30;
    char *t31;
    unsigned int t32;
    unsigned int t33;
    unsigned int t34;
    char *t35;
    unsigned int t36;
    unsigned int t37;
    unsigned int t38;
    unsigned int t39;
    char *t40;
    char *t41;
    char *t43;
    char *t44;
    char *t45;
    char *t46;
    char *t47;
    unsigned int t48;
    int t49;
    unsigned int t50;
    unsigned int t51;
    unsigned int t52;
    unsigned int t53;
    unsigned int t54;
    unsigned int t56;

LAB0:    t1 = (t0 + 7136U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(49, ng0);
    t2 = (t0 + 7816);
    *((int *)t2) = 1;
    t3 = (t0 + 7168);
    *((char **)t3) = t2;
    *((char **)t1) = &&LAB4;

LAB1:    return;
LAB4:    xsi_set_current_line(49, ng0);

LAB5:    xsi_set_current_line(50, ng0);
    t6 = (t0 + 1048U);
    t7 = *((char **)t6);
    t6 = ((char*)((ng2)));
    memset(t8, 0, 8);
    t9 = (t7 + 4);
    t10 = (t6 + 4);
    t11 = *((unsigned int *)t7);
    t12 = *((unsigned int *)t6);
    t13 = (t11 ^ t12);
    t14 = *((unsigned int *)t9);
    t15 = *((unsigned int *)t10);
    t16 = (t14 ^ t15);
    t17 = (t13 | t16);
    t18 = *((unsigned int *)t9);
    t19 = *((unsigned int *)t10);
    t20 = (t18 | t19);
    t21 = (~(t20));
    t22 = (t17 & t21);
    if (t22 != 0)
        goto LAB9;

LAB6:    if (t20 != 0)
        goto LAB8;

LAB7:    *((unsigned int *)t8) = 1;

LAB9:    memset(t5, 0, 8);
    t24 = (t8 + 4);
    t25 = *((unsigned int *)t24);
    t26 = (~(t25));
    t27 = *((unsigned int *)t8);
    t28 = (t27 & t26);
    t29 = (t28 & 1U);
    if (t29 != 0)
        goto LAB10;

LAB11:    if (*((unsigned int *)t24) != 0)
        goto LAB12;

LAB13:    t31 = (t5 + 4);
    t32 = *((unsigned int *)t5);
    t33 = *((unsigned int *)t31);
    t34 = (t32 || t33);
    if (t34 > 0)
        goto LAB14;

LAB15:    t36 = *((unsigned int *)t5);
    t37 = (~(t36));
    t38 = *((unsigned int *)t31);
    t39 = (t37 || t38);
    if (t39 > 0)
        goto LAB16;

LAB17:    if (*((unsigned int *)t31) > 0)
        goto LAB18;

LAB19:    if (*((unsigned int *)t5) > 0)
        goto LAB20;

LAB21:    memcpy(t4, t40, 8);

LAB22:    t41 = (t0 + 4488);
    t43 = (t0 + 4488);
    t44 = (t43 + 72U);
    t45 = *((char **)t44);
    t46 = ((char*)((ng3)));
    xsi_vlog_generic_convert_bit_index(t42, t45, 2, t46, 32, 1);
    t47 = (t42 + 4);
    t48 = *((unsigned int *)t47);
    t49 = (!(t48));
    if (t49 == 1)
        goto LAB23;

LAB24:    xsi_set_current_line(51, ng0);
    t2 = (t0 + 1048U);
    t3 = *((char **)t2);
    memset(t8, 0, 8);
    t2 = (t8 + 4);
    t6 = (t3 + 4);
    t11 = *((unsigned int *)t3);
    t12 = (t11 >> 31);
    t13 = (t12 & 1);
    *((unsigned int *)t8) = t13;
    t14 = *((unsigned int *)t6);
    t15 = (t14 >> 31);
    t16 = (t15 & 1);
    *((unsigned int *)t2) = t16;
    t7 = ((char*)((ng1)));
    memset(t42, 0, 8);
    t9 = (t8 + 4);
    t10 = (t7 + 4);
    t17 = *((unsigned int *)t8);
    t18 = *((unsigned int *)t7);
    t19 = (t17 ^ t18);
    t20 = *((unsigned int *)t9);
    t21 = *((unsigned int *)t10);
    t22 = (t20 ^ t21);
    t25 = (t19 | t22);
    t26 = *((unsigned int *)t9);
    t27 = *((unsigned int *)t10);
    t28 = (t26 | t27);
    t29 = (~(t28));
    t32 = (t25 & t29);
    if (t32 != 0)
        goto LAB28;

LAB25:    if (t28 != 0)
        goto LAB27;

LAB26:    *((unsigned int *)t42) = 1;

LAB28:    memset(t5, 0, 8);
    t24 = (t42 + 4);
    t33 = *((unsigned int *)t24);
    t34 = (~(t33));
    t36 = *((unsigned int *)t42);
    t37 = (t36 & t34);
    t38 = (t37 & 1U);
    if (t38 != 0)
        goto LAB29;

LAB30:    if (*((unsigned int *)t24) != 0)
        goto LAB31;

LAB32:    t31 = (t5 + 4);
    t39 = *((unsigned int *)t5);
    t48 = *((unsigned int *)t31);
    t50 = (t39 || t48);
    if (t50 > 0)
        goto LAB33;

LAB34:    t51 = *((unsigned int *)t5);
    t52 = (~(t51));
    t53 = *((unsigned int *)t31);
    t54 = (t52 || t53);
    if (t54 > 0)
        goto LAB35;

LAB36:    if (*((unsigned int *)t31) > 0)
        goto LAB37;

LAB38:    if (*((unsigned int *)t5) > 0)
        goto LAB39;

LAB40:    memcpy(t4, t40, 8);

LAB41:    t41 = (t0 + 4488);
    t43 = (t0 + 4488);
    t44 = (t43 + 72U);
    t45 = *((char **)t44);
    t46 = ((char*)((ng4)));
    xsi_vlog_generic_convert_bit_index(t55, t45, 2, t46, 32, 1);
    t47 = (t55 + 4);
    t56 = *((unsigned int *)t47);
    t49 = (!(t56));
    if (t49 == 1)
        goto LAB42;

LAB43:    xsi_set_current_line(52, ng0);
    t2 = (t0 + 1528U);
    t3 = *((char **)t2);
    memset(t4, 0, 8);
    t2 = (t4 + 4);
    t6 = (t3 + 4);
    t11 = *((unsigned int *)t3);
    t12 = (t11 >> 0);
    *((unsigned int *)t4) = t12;
    t13 = *((unsigned int *)t6);
    t14 = (t13 >> 0);
    *((unsigned int *)t2) = t14;
    t15 = *((unsigned int *)t4);
    *((unsigned int *)t4) = (t15 & 7U);
    t16 = *((unsigned int *)t2);
    *((unsigned int *)t2) = (t16 & 7U);

LAB44:    t7 = ((char*)((ng2)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t7, 3);
    if (t49 == 1)
        goto LAB45;

LAB46:    t2 = ((char*)((ng1)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t2, 3);
    if (t49 == 1)
        goto LAB47;

LAB48:    t2 = ((char*)((ng6)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t2, 3);
    if (t49 == 1)
        goto LAB49;

LAB50:    t2 = ((char*)((ng7)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t2, 3);
    if (t49 == 1)
        goto LAB51;

LAB52:    t2 = ((char*)((ng8)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t2, 3);
    if (t49 == 1)
        goto LAB53;

LAB54:    t2 = ((char*)((ng9)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t2, 3);
    if (t49 == 1)
        goto LAB55;

LAB56:    t2 = ((char*)((ng10)));
    t49 = xsi_vlog_unsigned_case_compare(t4, 3, t2, 3);
    if (t49 == 1)
        goto LAB57;

LAB58:
LAB60:
LAB59:    xsi_set_current_line(89, ng0);

LAB83:    xsi_set_current_line(90, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t2, 0, 0, 32);
    xsi_set_current_line(91, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB84;

LAB85:
LAB61:    goto LAB2;

LAB8:    t23 = (t8 + 4);
    *((unsigned int *)t8) = 1;
    *((unsigned int *)t23) = 1;
    goto LAB9;

LAB10:    *((unsigned int *)t5) = 1;
    goto LAB13;

LAB12:    t30 = (t5 + 4);
    *((unsigned int *)t5) = 1;
    *((unsigned int *)t30) = 1;
    goto LAB13;

LAB14:    t35 = ((char*)((ng1)));
    goto LAB15;

LAB16:    t40 = ((char*)((ng2)));
    goto LAB17;

LAB18:    xsi_vlog_unsigned_bit_combine(t4, 1, t35, 1, t40, 1);
    goto LAB22;

LAB20:    memcpy(t4, t35, 8);
    goto LAB22;

LAB23:    xsi_vlogvar_assign_value(t41, t4, 0, *((unsigned int *)t42), 1);
    goto LAB24;

LAB27:    t23 = (t42 + 4);
    *((unsigned int *)t42) = 1;
    *((unsigned int *)t23) = 1;
    goto LAB28;

LAB29:    *((unsigned int *)t5) = 1;
    goto LAB32;

LAB31:    t30 = (t5 + 4);
    *((unsigned int *)t5) = 1;
    *((unsigned int *)t30) = 1;
    goto LAB32;

LAB33:    t35 = ((char*)((ng1)));
    goto LAB34;

LAB35:    t40 = ((char*)((ng2)));
    goto LAB36;

LAB37:    xsi_vlog_unsigned_bit_combine(t4, 1, t35, 1, t40, 1);
    goto LAB41;

LAB39:    memcpy(t4, t35, 8);
    goto LAB41;

LAB42:    xsi_vlogvar_assign_value(t41, t4, 0, *((unsigned int *)t55), 1);
    goto LAB43;

LAB45:    xsi_set_current_line(54, ng0);

LAB62:    xsi_set_current_line(55, ng0);
    t9 = (t0 + 1688U);
    t10 = *((char **)t9);
    t9 = (t0 + 4328);
    xsi_vlogvar_assign_value(t9, t10, 0, 0, 32);
    xsi_set_current_line(56, ng0);
    t2 = (t0 + 2808U);
    t3 = *((char **)t2);
    t2 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB63;

LAB64:    goto LAB61;

LAB47:    xsi_set_current_line(59, ng0);

LAB65:    xsi_set_current_line(60, ng0);
    t3 = (t0 + 1848U);
    t6 = *((char **)t3);
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t6, 0, 0, 32);
    xsi_set_current_line(61, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB66;

LAB67:    goto LAB61;

LAB49:    xsi_set_current_line(64, ng0);

LAB68:    xsi_set_current_line(65, ng0);
    t3 = (t0 + 2008U);
    t6 = *((char **)t3);
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t6, 0, 0, 32);
    xsi_set_current_line(66, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB69;

LAB70:    goto LAB61;

LAB51:    xsi_set_current_line(69, ng0);

LAB71:    xsi_set_current_line(70, ng0);
    t3 = (t0 + 2168U);
    t6 = *((char **)t3);
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t6, 0, 0, 32);
    xsi_set_current_line(71, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB72;

LAB73:    goto LAB61;

LAB53:    xsi_set_current_line(74, ng0);

LAB74:    xsi_set_current_line(75, ng0);
    t3 = (t0 + 2328U);
    t6 = *((char **)t3);
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t6, 0, 0, 32);
    xsi_set_current_line(76, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB75;

LAB76:    goto LAB61;

LAB55:    xsi_set_current_line(79, ng0);

LAB77:    xsi_set_current_line(80, ng0);
    t3 = (t0 + 2488U);
    t6 = *((char **)t3);
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t6, 0, 0, 32);
    xsi_set_current_line(81, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB78;

LAB79:    goto LAB61;

LAB57:    xsi_set_current_line(84, ng0);

LAB80:    xsi_set_current_line(85, ng0);
    t3 = (t0 + 2648U);
    t6 = *((char **)t3);
    t3 = (t0 + 4328);
    xsi_vlogvar_assign_value(t3, t6, 0, 0, 32);
    xsi_set_current_line(86, ng0);
    t2 = ((char*)((ng2)));
    t3 = (t0 + 4488);
    t6 = (t0 + 4488);
    t7 = (t6 + 72U);
    t9 = *((char **)t7);
    t10 = ((char*)((ng5)));
    xsi_vlog_generic_convert_bit_index(t5, t9, 2, t10, 32, 1);
    t23 = (t5 + 4);
    t11 = *((unsigned int *)t23);
    t49 = (!(t11));
    if (t49 == 1)
        goto LAB81;

LAB82:    goto LAB61;

LAB63:    xsi_vlogvar_assign_value(t2, t3, 0, *((unsigned int *)t5), 1);
    goto LAB64;

LAB66:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB67;

LAB69:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB70;

LAB72:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB73;

LAB75:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB76;

LAB78:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB79;

LAB81:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB82;

LAB84:    xsi_vlogvar_assign_value(t3, t2, 0, *((unsigned int *)t5), 1);
    goto LAB85;

}

static void implSig1_execute(char *t0)
{
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t5;
    char *t6;
    char *t7;
    unsigned int t8;
    unsigned int t9;
    char *t10;
    unsigned int t11;
    unsigned int t12;
    char *t13;
    unsigned int t14;
    unsigned int t15;

LAB0:    t1 = (t0 + 7384U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    t2 = ((char*)((ng2)));
    t3 = (t0 + 8344);
    t4 = (t3 + 56U);
    t5 = *((char **)t4);
    t6 = (t5 + 56U);
    t7 = *((char **)t6);
    memset(t7, 0, 8);
    t8 = 1U;
    t9 = t8;
    t10 = (t2 + 4);
    t11 = *((unsigned int *)t2);
    t8 = (t8 & t11);
    t12 = *((unsigned int *)t10);
    t9 = (t9 & t12);
    t13 = (t7 + 4);
    t14 = *((unsigned int *)t7);
    *((unsigned int *)t7) = (t14 | t8);
    t15 = *((unsigned int *)t13);
    *((unsigned int *)t13) = (t15 | t9);
    xsi_driver_vfirst_trans(t3, 0, 0);

LAB1:    return;
}


extern void work_m_07001573178103174474_2725559894_init()
{
	static char *pe[] = {(void *)Cont_40_0,(void *)Cont_41_1,(void *)Cont_42_2,(void *)Cont_44_3,(void *)Cont_45_4,(void *)Cont_46_5,(void *)Cont_47_6,(void *)Always_49_7,(void *)implSig1_execute};
	xsi_register_didat("work_m_07001573178103174474_2725559894", "isim/KGP_RISC_tb_isim_beh.exe.sim/work/m_07001573178103174474_2725559894.didat");
	xsi_register_executes(pe);
}
