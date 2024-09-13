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
static const char *ng0 = "/home/nikhil/Desktop/COA_Lab_Grp_60/COA_lab_Grp_60/write_data_selector.v";
static unsigned int ng1[] = {1U, 0U};
static unsigned int ng2[] = {2U, 0U};



static void Always_39_0(char *t0)
{
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t5;
    int t6;
    char *t7;
    char *t8;

LAB0:    t1 = (t0 + 2840U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(39, ng0);
    t2 = (t0 + 3160);
    *((int *)t2) = 1;
    t3 = (t0 + 2872);
    *((char **)t3) = t2;
    *((char **)t1) = &&LAB4;

LAB1:    return;
LAB4:    xsi_set_current_line(39, ng0);

LAB5:    xsi_set_current_line(40, ng0);
    t4 = (t0 + 1048U);
    t5 = *((char **)t4);

LAB6:    t4 = ((char*)((ng1)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 2, t4, 2);
    if (t6 == 1)
        goto LAB7;

LAB8:    t2 = ((char*)((ng2)));
    t6 = xsi_vlog_unsigned_case_compare(t5, 2, t2, 2);
    if (t6 == 1)
        goto LAB9;

LAB10:
LAB12:
LAB11:    xsi_set_current_line(50, ng0);

LAB16:    xsi_set_current_line(51, ng0);
    t2 = (t0 + 1368U);
    t3 = *((char **)t2);
    t2 = (t0 + 1928);
    xsi_vlogvar_wait_assign_value(t2, t3, 0, 0, 32, 0LL);

LAB13:    goto LAB2;

LAB7:    xsi_set_current_line(42, ng0);

LAB14:    xsi_set_current_line(43, ng0);
    t7 = (t0 + 1208U);
    t8 = *((char **)t7);
    t7 = (t0 + 1928);
    xsi_vlogvar_wait_assign_value(t7, t8, 0, 0, 32, 0LL);
    goto LAB13;

LAB9:    xsi_set_current_line(46, ng0);

LAB15:    xsi_set_current_line(47, ng0);
    t3 = (t0 + 1528U);
    t4 = *((char **)t3);
    t3 = (t0 + 1928);
    xsi_vlogvar_wait_assign_value(t3, t4, 0, 0, 32, 0LL);
    goto LAB13;

}


extern void work_m_11734378123523334338_3372779588_init()
{
	static char *pe[] = {(void *)Always_39_0};
	xsi_register_didat("work_m_11734378123523334338_3372779588", "isim/KGP_RISC_tb_isim_beh.exe.sim/work/m_11734378123523334338_3372779588.didat");
	xsi_register_executes(pe);
}
